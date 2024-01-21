import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import { AppBar, ReusableBtn } from '../../components';
import { COLORS, SIZES } from '../../constants/theme';
import { useRoute } from '@react-navigation/native';
import ReusableTile from '../../components/Reusable/ReusableTile';

const SelectRoom = ({navigation}) => {

  const router = useRoute()
  const {hotel, startDate, endDate}= router.params

  const rooms = [
    {
      room_id: "1",
      country_id: hotel.country_id,
      title: "Economy Room",
      location: hotel.location,
      imageUrl:
        hotel.imageUrl,
      rating: hotel.rating,
      review: hotel.review,
      price:Math.floor(hotel.price),
      guest: 2,
      hotel_id: hotel._id
    },
    {
      room_id: "2",
      country_id: hotel.country_id,
      title: "Deluxe Room",
      location: hotel.location,
      imageUrl:
        hotel.imageUrl,
      rating: hotel.rating,
      review: hotel.review,
      price:Math.floor(hotel.price * 1.2),
      guest: 4,
      hotel_id: hotel._id
    },
    {
      room_id: "3",
      country_id: hotel.country_id,
      title: "Superior Room",
      location: hotel.location,
      imageUrl:
        hotel.imageUrl,
      rating: hotel.rating,
      review: hotel.review,
      price:Math.floor(hotel.price * 1.5),
      guest: 6,
      hotel_id: hotel._id
    },
  ];

  return (
    <View style={{flex:1}}>
    <View style={{ height: 100 }}>
      <AppBar
        top={50}
        left={20}
        right={20}
        title={"Select Room"}
        color={COLORS.white}
        onPress={() => navigation.goBack()}
      />
    </View>

    <FlatList 
      data={rooms}
      showVerticalScrollIndicator={false}
      keyExtractor={(item) => item.room_id}
      renderItem={({item})=> (
        <View style={styles.tileColumn}>
          <View style={styles.tile}>
          <ReusableTile item={item}/> 

        <View style={styles.btnStyle}>
        <ReusableBtn
        onPress={() => navigation.navigate("SelectedRoom", {item:item, startDate:startDate, endDate:endDate})}
        btnText={"Select Room"}
        width={SIZES.width - 50}
        backgroundColor={COLORS.green}
        borderColor={COLORS.green}
        borderWidth={0}
        textColor={COLORS.white}
      />
        </View>
          </View>
        </View>
      )}
    />
  </View>
  )
}

export default SelectRoom

const styles = StyleSheet.create({
  tileColumn: {marginHorizontal: 20, marginBottom: 10},
  tile: {backgroundColor: COLORS.lightWhite, borderRadius: 12},
  btnStyle: {margin: 10, alignItems: "center"}
});
