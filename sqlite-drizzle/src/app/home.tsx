import { useEffect, useState } from "react";
import { TextInput, View, FlatList, Pressable, Text, Alert } from "react-native";
import { Button } from "@/components/button";
import { PRODUTOS } from "@/data/produtos";
import { useSQLiteContext } from 'expo-sqlite'
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as productSchema from '@/database/schemas/productSchema'
import { asc, eq, like } from "drizzle-orm";

interface Data {
  id: number
  title: string
}

export default function Home() {
  const [name, setName] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [data, setData] = useState<Data[] | null>([])
  const database = useSQLiteContext()
  const db = drizzle(database, { schema: productSchema })

  async function fetchProducts() {
    try {
      const response = await db.query.product.findMany({
        where: like(productSchema.product.title, `%${search}%`),
        orderBy: [asc(productSchema.product.title)]
      })
      setData(response)

    } catch (error) {
      console.error(error);

    }
  }

  async function handleCreateProducts() {
    try {
      const response = await db.insert(productSchema.product).values({
        title: name
      })

      Alert.alert(`Cadastro com o ID: ${response.lastInsertRowId}`)
      setName('')
      await fetchProducts()

    } catch (error) {
      console.error(error);

    }
  }

  async function removerProduct(id: number) {
    try {

      Alert.alert('Remover', 'Deseja remover', [{
        text: 'Cancelar',
        style: 'cancel',
      }, {
        text: 'Sim',
        onPress: async () => {
          await db.delete(productSchema.product).
            where(eq(productSchema.product.id, id))

          await fetchProducts()
        }
      }])
    } catch (error) {
      console.error(error);

    }
  }

  async function showProduct(id: number) {
    const product = await db.query.product.findFirst({
      where: eq(productSchema.product.id, id)
    })

    if (product) {
      Alert.alert(`Produto ID ${product.id} cadastro com o ${product.title}`)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [search])

  return (
    <View className="flex-1 gap-6 p-8 mt-5 bg-zinc-950 ">

      <TextInput
        className="py-3 px-4 border border-zinc-800 rounded text-lg 
        font-medium text-white placeholder:text-zinc-400"
        placeholder="Cadastrar produto...."
        onChangeText={setName}
        value={name}
      />
      <TextInput
        className="py-3 px-4 border border-zinc-800 rounded text-lg 
        font-medium text-white placeholder:text-zinc-400"
        placeholder="Pesquisar o produto...."
        onChangeText={setSearch}
        value={search}
      />
      <Button
        title="Salvar"
        onPress={handleCreateProducts}
      />



      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={() => <Text className="text-xl font-bold text-white ">Lista vazia.</Text>}
        contentContainerClassName="gap-4"
        renderItem={({ item }) =>
          <Pressable
            className="p-4 border border-zinc-900 "
            onLongPress={() => removerProduct(item.id)}
            onPress={() => showProduct(item.id)}
          >
            <Text className="text-xl font-medium text-white">{item.title}</Text>
          </Pressable>

        }
      />
      
    </View>
  )
}