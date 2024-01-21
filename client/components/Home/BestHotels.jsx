import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES, TEXT } from '../../constants/theme'
import reusable from '../Reusable/reusable.style'
import {Feather} from '@expo/vector-icons'
import ReusableText from '../Reusable/ReusableText'
import { useNavigation } from '@react-navigation/native'
import HotelCard from '../Tiles/Hotels/HotelCard'
import fetchHotels from '../../hook/fetchHotels'

const BestHotels = () => {

    const navigation = useNavigation()

    const {hotels, isLoading, error, refetch} = fetchHotels(1)
    
  return (
    <View>
         <View style={[reusable.rowWithSpace('space-between'), {paddingBottom: 10}]}>
      <ReusableText
          text={'Nearby Hotels'}
          family={"medium"}
          size={TEXT.large}
          color={COLORS.black}
        />
        <TouchableOpacity onPress={() => navigation.navigate('HotelList')}>
            <Feather
                name="list"
                size={20}
            />
        </TouchableOpacity>
      </View>
      {isLoading ? 
       <ActivityIndicator size={SIZES.xxLarge} color={COLORS.lightBlue}/>:
       
      <FlatList 
        data={hotels}
        horizontal
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{columnGap: SIZES.medium}}
        renderItem={({item}) => (
            <HotelCard item={item} margin={10} onPress={() => navigation.navigate('HotelDetails', item._id)}/>
        )}
      />
      }
    </View>
  )
}

export default BestHotels

const styles = StyleSheet.create({})