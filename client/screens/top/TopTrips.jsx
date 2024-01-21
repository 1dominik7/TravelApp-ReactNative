import { View, FlatList, Text } from 'react-native'
import React, {useEffect, useState } from 'react'
import HorizontalShimmer from '../../components/Shimmers/HorizontalShimmer';
import fetchReviewsByUser from '../../hook/fetchReviewsByUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating, ReusableHotel } from '../../components';
import { format } from 'date-fns';
import { COLORS } from '../../constants/theme';

const TopTrips = ({navigation}) => {

  const [id, setId] = useState(null)

  useEffect(() =>{
    const getId = async () =>{
      const id =await AsyncStorage.getItem("id");
      const userId = JSON.parse(id)
      setId(userId)
    }
    getId()
  },[])

    const {reviews, isLoading, error, refetch} = fetchReviewsByUser(id !== null ? id : "");

    useEffect(() =>{
      if(id){
        refetch()
      }
    },[id])

  return (
    <View style={{margin: 20, height:"70%"}}>
        {isLoading ? 
      ( <HorizontalShimmer
        horizontal={false}
        width={'100%'}
        height={95}
        radius={12}
        paddingTop={12}
      />)
      :
    <FlatList 
      data={reviews}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item._id}
      renderItem={({item}) => (
        <View style={{marginBottom: 10}}>
          <ReusableHotel item={item.place} onPress={() => navigation.navigate("AddReviews", item.place)}/>
          <View style={{   padding: 10,backgroundColor: COLORS.lightWhite,borderRadius: 12,}}>
            <Text>Description: {item.review}</Text>
            <View style={{flexDirection:"row", gap:5, alignItems:"center"}}>
            <Text>Rate: {item.rating}/5</Text>
            <Rating/>
            </View>
            <Text>Review added: {format(item.updatedAt, "dd/MM/yyyy")}</Text>
          </View>
        </View>
      )}
    />}
  </View>
  )
}

export default TopTrips