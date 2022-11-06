import { useCallback, useState } from "react";
import { VStack, Icon, useToast, FlatList } from "native-base";
import { api } from "../services/api";

import { Octicons } from '@expo/vector-icons'

import { useNavigation , useFocusEffect} from '@react-navigation/native'
import { Button } from "../components/Button";
import { PoolCard, PoolCardProps } from "../components/PoolCard";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { InternalSymbolName } from "typescript";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { EmptyPoolList } from "../components/EmptyPoolList";


export function Pools() {
  const [isLoading, setIsLoading] = useState(false)
  const [pools, setPools] = useState<PoolCardProps[]>([])

  const {navigate} = useNavigation()
  const toast = useToast()

  async function fetchPool() {
    
    try {
      const response = await api.get('/pools')
      setPools(response.data.pools)
      
      setIsLoading(true)

    } catch (error) {
      console.log(error);

      toast.show({
        title: 'Não foi posseie carregas os bolões',
        placement: 'top',
        bgColor: 'red.500'
      })

    } finally {
      setIsLoading(false)
    }
  }


  useFocusEffect(useCallback(() => {
    fetchPool()
  }, []))


  return (
    <VStack flex={1} background="gray.900">

      <Header title="Meus bolões" />
      <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>

        <Button title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={<Icon as={Octicons} name="search"
            color="black" size="md" />}
          onPress={() => navigate('find')}
        />
      </VStack>

      {
        isLoading ?
          <Loading /> :
          <FlatList
            data={pools}
            keyExtractor={item => item.id}
            renderItem={({ item }) => 
            <PoolCard data={item}
            onPress={()=> navigate('details',{id:item.id})}
            />}
            px={5}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ pb: 10 }}
            ListEmptyComponent={() => <EmptyPoolList />}
          />
      }



    </VStack>
  )
}