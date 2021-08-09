import React, { useContext, useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'

import { ProductsContext } from '../context/ProductsContext'
import { ProductsStackParams } from '../navigator/ProductsNavigator'

interface Props extends StackScreenProps<ProductsStackParams, 'Products'>{}

export const Products = ({ navigation }: Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { products, loadProducts } = useContext(ProductsContext)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ marginRight: 10 }}
          onPress={
            () => navigation.navigate('Product', {})
          }
        >
          <Text>Agregar</Text>
        </TouchableOpacity>
      )
    })
  }, [])

  // Pull to refresh
  const loadProductsFromBackend = async () => {
    setIsRefreshing(true)
    await loadProducts()
    setIsRefreshing(false)
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={p => p._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={
              () => navigation.navigate('Product', {
                id: item._id,
                name: item.nombre
              })
            }
          >
            <Text style={styles.productName}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => (
          <View style={styles.itemSeparator} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={loadProductsFromBackend}
          />
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10
  },
  productName: {
    fontSize: 20
  },
  itemSeparator: {
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 2,
    marginVertical: 5
  }
})
