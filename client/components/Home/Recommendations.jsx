import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import reusable from '../Reusable/reusable.style'
import ReusableText from '../Reusable/ReusableText'
import { COLORS, SIZES, TEXT } from '../../constants/theme'
import {Feather} from '@expo/vector-icons'
import ReusableTile from '../Reusable/ReusableTile'
import fetchRecommendations from '../../hook/fetchRecommendatios'

const Recommendation = () => {

    const navigation = useNavigation()

    const {recommendations, isLoading, error, refetch} = fetchRecommendations()

  if(isLoading){
    return <ActivityIndicator size={SIZES.xxLarge} color={COLORS.lightBlue}/>
  }

  return (
    <View style={styles.container}>
      <View style={[reusable.rowWithSpace('space-between'), {paddingBottom: 15}]}>
      <ReusableText
           text={"Recommendations"}
           family={"medium"}
           size={TEXT.large}
           color={COLORS.black}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Recommended')}>
            <Feather 
                name="list"
                size={20}
            />
        </TouchableOpacity>
      </View>
      <FlatList 
        data={recommendations}
        horizontal
        pagingEnabled={true}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{columnGap: SIZES.medium}}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={{width:340}}>
            <ReusableTile item={item} onPress={() => navigation.navigate('PlaceDetails', item._id)}/>
          </View>
        )}
      />
    </View>
  )
}

export default Recommendation

const styles = StyleSheet.create({
    container: {
        paddingTop: 10
    }
})