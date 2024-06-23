import { useState } from "react";
import { TextInput, View, FlatList, Pressable, Text } from "react-native";
import { Button } from "@/components/button";
import { PRODUTOS } from "@/data/produtos";

interface Data {
  id: number
  title: string
}

export default function Home() {
  const [name, setName] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [data, setData] = useState<Data[] | null>([])

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
      />



      <FlatList
        data={PRODUTOS}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={() => <Text className="text-xl font-bold ">Lista vazia.</Text>}
        renderItem={({ item }) =>
          <Pressable className="p-4 border border-zinc-900 m-2">
            <Text className="text-xl font-medium text-white">{item.title}</Text>
          </Pressable>

        }
      />


    </View>
  )
}