import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, Button, Image } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { Picker } from '@react-native-picker/picker'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/Ionicons'

import { ProductsContext } from '../context/ProductsContext'
import { ProductsStackParams } from '../navigator/ProductsNavigator'
import { useCategories } from '../hooks/useCategories'
import { useForm } from '../hooks/useForm'

interface Props extends StackScreenProps<ProductsStackParams, 'Product'>{}

export const Product = ({ navigation, route }: Props) => {
  const { id = '', name = '' } = route.params
  const [tempUri, setTempUri] = useState<string>()
  const { loadProductById, addProducts, updateProducts, uploadImage } = useContext(ProductsContext)
  const { categories } = useCategories()

  const { _id, categoriaId, nombre, img, onChange, setFormValue } = useForm({
    _id: id,
    categoriaId: '',
    nombre: name,
    img: ''
  })

  useEffect(() => {
    navigation.setOptions({ title: (nombre) || 'Sin nombre de producto' })
  }, [nombre])

  useEffect(() => {
    loadProduct()
  }, [])

  const loadProduct = async () => {
    if (id.length === 0) return
    const product = await loadProductById(id)
    setFormValue({
      _id: id,
      categoriaId: product.categoria._id,
      img: (product.img) ? product.img : '',
      nombre
    })
  }

  const saveOrUpdate = async () => {
    if (id.length > 0) {
      updateProducts(categoriaId, nombre, id)
    } else {
      const tempCategoriaId = categoriaId || categories[0]._id
      const newProduct = await addProducts(tempCategoriaId, nombre)
      onChange(newProduct._id, '_id')
    }
  }

  const takePhoto = () => {
    launchCamera({
      mediaType: 'photo',
      quality: 0.5
    }, (resp) => {
      if (resp.didCancel) return
      if (!resp.assets?.[0].uri) return
      setTempUri(resp.assets?.[0].uri)
      uploadImage(resp, _id)
    })
  }

  const takePhotoFromGallery = () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5
    }, (resp) => {
      if (resp.didCancel) return
      if (!resp.assets?.[0].uri) return
      setTempUri(resp.assets?.[0].uri)
      uploadImage(resp, _id)
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Caja de texto */}
        <Text style={styles.label}>Producto:</Text>
        <TextInput
          placeholder='Producto'
          style={styles.textImput}
          value={nombre}
          onChangeText={(value) => onChange(value, 'nombre')}
        />

        {/* Picker / Selector */}
        <Text style={styles.label}>Categoria:</Text>
        <Picker
          selectedValue={categoriaId}
          onValueChange={(value) => onChange(value, 'categoriaId')}
        >
          {
            categories.map(c => (
              <Picker.Item
                key={c._id}
                label={c.nombre}
                value={c._id}
              />
            ))
          }
        </Picker>

        {/* Botones */}
        <View style={styles.buttons}>
          <Icon name='save-outline' size={20} color='white' />
          <Button
            title='Guardar'
            onPress={saveOrUpdate}
            color='#5856D6'
          />
        </View>

        {
          (_id.length > 0) && (
            <View style={styles.buttonsContainer}>
              <View style={styles.buttons}>
                <Icon name='camera-outline' size={20} color='white' />
                <Button
                  title='Cámara'
                  onPress={takePhoto}
                  color='#5856D6'
                />
              </View>

              <View style={{ width: 10 }} />

              <View style={styles.buttons}>
                <Icon name='cloud-upload-outline' size={20} color='white' />
                <Button
                  title='Galería'
                  onPress={takePhotoFromGallery}
                  color='#5856D6'
                />
              </View>
            </View>
          )
        }

        {
          (img.length > 0 && !tempUri) && (
            <Image
              source={{ uri: img }}
              style={{
                height: 300,
                marginTop: 20,
                width: '100%'
              }}
            />
          )
        }

        {/* Mostrar imagen temporal */}
        {
          (tempUri) && (
            <Image
              source={{ uri: tempUri }}
              style={{
                height: 300,
                marginTop: 20,
                width: '100%'
              }}
            />
          )
        }

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 10
  },
  label: {
    fontSize: 18
  },
  textImput: {
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 20,
    borderWidth: 1,
    height: 45,
    marginBottom: 15,
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10

  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5856D6',
    borderColor: 'white',
    borderRadius: 100,
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 3
  }
})
