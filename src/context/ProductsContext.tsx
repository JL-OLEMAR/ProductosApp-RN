import React, { createContext, useState } from 'react'
import { Producto } from '../interfaces/appInterface'

interface ProductsContextProps {
  products: Producto[]
  loadProducts: () => Promise<void>
  loadProductById: (id: string) => Promise<Producto>
  addProducts: (categoryId: string, productName: string) => Promise<void>
  updateProducts: (categoryId: string, productName: string, productId: string) => Promise<void>
  deleteProducts: (id: string) => Promise<void>
  uploadImage: (data: any, id: string) => Promise<void> // TODO: cambiar any
}

export const ProductsContext = createContext({} as ProductsContextProps)

export const ProductsProvider = ({ children }: any) => {
  const [products, setProducts] = useState<Producto[]>([])

  const loadProducts = async () => {

  }
  const loadProductById = async (id: string) => {
    throw new Error('Not implemented')
  }

  const addProducts = async (categoryId: string, productName: string) => {

  }

  const updateProducts = async (categoryId: string, productName: string, productId: string) => {

  }

  const deleteProducts = async (id: string) => {

  }

  // TODO: cambiar any
  const uploadImage = async (data: any, id: string) => {

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
