import React, { createContext, useEffect, useState } from 'react'
import { ImagePickerResponse } from 'react-native-image-picker'
import cafeApi from '../api/cafeApi'
import { Producto, ProductoResponse } from '../interfaces/appInterface'

interface ProductsContextProps {
  products: Producto[]
  loadProducts: () => Promise<void>
  loadProductById: (id: string) => Promise<Producto>
  addProducts: (categoryId: string, productName: string) => Promise<Producto>
  updateProducts: (categoryId: string, productName: string, productId: string) => Promise<void>
  deleteProducts: (id: string) => Promise<void>
  uploadImage: (data: any, id: string) => Promise<void>
}

export const ProductsContext = createContext({} as ProductsContextProps)

export const ProductsProvider = ({ children }: any) => {
  const [products, setProducts] = useState<Producto[]>([])

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    const resp = await cafeApi.get<ProductoResponse>('/productos?limite=50')
    setProducts([...resp.data.productos])
  }

  const loadProductById = async (id: string): Promise<Producto> => {
    const resp = await cafeApi.get<Producto>(`/productos/${id}`)
    return resp.data
  }

  const addProducts = async (categoryId: string, productName: string): Promise<Producto> => {
    const resp = await cafeApi.post<Producto>('/productos', {
      nombre: productName,
      categoria: categoryId
    })
    setProducts([...products, resp.data])
    return resp.data
  }

  const updateProducts = async (categoryId: string, productName: string, productId: string) => {
    const resp = await cafeApi.put<Producto>(`/productos/${productId}`, {
      nombre: productName,
      categoria: categoryId
    })
    setProducts(products.map(prod => (prod._id === productId) ? resp.data : prod))
  }

  const deleteProducts = async (id: string) => {

  }

  const uploadImage = async (data: ImagePickerResponse, id: string) => {
    const fileToUpload = {
      uri: data.assets?.[0].uri,
      type: data.assets?.[0].type,
      name: data.assets?.[0].fileName
    }

    const formData = new FormData()
    formData.append('archivo', fileToUpload)

    try {
      const resp = await cafeApi.put(`/uploads/productos/${id}`, formData)
      console.log(resp)
    } catch (error) {
      console.log({ error })
    }
  }

  return (
    <ProductsContext.Provider value={{
      products,
      loadProducts,
      loadProductById,
      addProducts,
      updateProducts,
      deleteProducts,
      uploadImage
    }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
