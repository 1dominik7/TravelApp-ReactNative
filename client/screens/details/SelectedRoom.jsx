import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { COLORS, SIZES } from '../../constants/theme'
import { AppBar, AssetImage, Counter, HeightSpacer, NetworkImage, Rating, ReusableBtn, ReusableText, WidthSpacer } from '../../components'
import reusable from '../../components/Reusable/reusable.style'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios'

const SelectedRoom = ({navigation}) => {

  const [count, setCount] = useState(1)

    const router = useRoute()
    const {item,startDate, endDate} = router.params

    let date1 = startDate;
    let date2 = endDate;

    const oneDay = 24 * 60 * 60 * 1000; 
    const firstDate = new Date(date1.split('/')[2], date1.split('/')[1], date1.split('/')[0]);
    const secondDate = new Date(date2.split('/')[2], date2.split('/')[1], date2.split('/')[0]);
    
    const nights = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    
    const postReservation = async ()=> {
      const userId = await AsyncStorage.getItem('id') 
      const token = await AsyncStorage.getItem('token') 
      const accessToken = JSON.parse(token)
      const id = JSON.parse(userId)

      const endpoint = 'http://192.168.1.107:5003/api/reservation'
  
      const data = {
          "user": id,
          "guest": count,
          "hotel": item.hotel_id,
          "price": item.price*nights,
          "room_id": item.room_id,
          "title": item.title,
          "startDate": startDate,
          "endDate": endDate,
      }
  
      try {
         const response = await axios.post(endpoint,data,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
  
            if(response.status === 200){
            navigation.navigate("Success", {item:item,startDate:startDate, endDate:endDate})
          } else{
            navigation.navigate("Fail", {item:item,startDate:startDate, endDate:endDate})
          }
      } catch (error) {
         console.log(error);
      } 
  }

  return (
    <View>
      <View style={{ height: 100 }}>
      <AppBar
        top={50}
        left={20}
        right={20}
        title={item.title}
        color={COLORS.white}
        onPress={() => navigation.goBack()}
      />
    </View>
    <View style={{marginHorizontal: 20}}>
    <View style={{backgroundColor: COLORS.lightWhite, borderRadius: 16}}>
        <NetworkImage 
            source={item.imageUrl}
            width={"100%"}
            height={200}
            radius={16}
        />
        <HeightSpacer height={20}/>
        <View style={{marginHorizontal: 10}}>
        <View style={reusable.rowWithSpace('space-between')}>
        <ReusableText
            text={item.title}
            family={"medium"}
            size={SIZES.medium}
            color={COLORS.black}
          />
        <View style={reusable.rowWithSpace('flex-start')}>
            <Rating rating={item.rating}/>
            <WidthSpacer width={10}/>
            <ReusableText
            text={`(${item.review})`}
            family={"regular"}
            size={SIZES.medium}
            color={COLORS.gray}
          />
        </View>
        </View>
        <HeightSpacer height={10}/>
        <ReusableText
            text={item.location}
            family={"medium"}
            size={SIZES.medium}
            color={COLORS.gray}
          />
          <View style={{borderWidth: 0.5, borderColor: COLORS.lightGrey, marginVertical: 15}}>
          </View>
          <ReusableText
            text={'Room Requirements'}
            family={"regular"}
            size={SIZES.medium}
            color={COLORS.black}
          />
            <HeightSpacer height={30}/>
            <View style={reusable.rowWithSpace('space-between')}>
            <ReusableText
            text={'Price per night'}
            family={"regular"}
            size={SIZES.medium}
            color={COLORS.black}
          />
            <ReusableText
            text={`$ ${item.price * nights} (${nights} ${nights > 1 ? "nights" : "night"})`}
            family={"regular"}
            size={SIZES.medium}
            color={COLORS.black}
          />
            </View>
            <HeightSpacer height={15}/>
            <View style={reusable.rowWithSpace('space-between')}>
            <ReusableText
            text={'Payment Method'}
            family={"regular"}
            size={SIZES.medium}
            color={COLORS.black}
          />
        <View style={reusable.rowWithSpace('flex-start')}>
            <AssetImage mode={'contain'} width={30} height={20} data={require('../../assets/images/Visa.png')}/>
        <ReusableText
            text={'Visa'}
            family={"regular"}
            size={SIZES.medium}
            color={COLORS.black}
          />

          </View>
            </View>
            <HeightSpacer height={15}/>
          <View style={reusable.rowWithSpace('space-between')}>
          <ReusableText
            text={`Max guests - ${item.guest}`}
            family={"regular"}
            size={SIZES.medium}
            color={COLORS.black}
          />
          <Counter maxPeople={item?.guest} count={count} setCount={setCount}/>
          </View>
          <HeightSpacer height={15}/>
          <View style={reusable.rowWithSpace('space-between')}>
          <ReusableText
            text={"Availability"}
            family={"regular"}
            size={SIZES.medium}
            color={COLORS.black}
          />
          <ReusableText
            text={`${startDate} - ${endDate}`}
            family={"regular"}
            size={SIZES.medium}
            color={COLORS.black}
          />
          </View>
          <HeightSpacer height={30}/>
          <ReusableBtn
        onPress={() => postReservation()}
        btnText={"Book Now"}
        width={SIZES.width - 50}
        backgroundColor={COLORS.green}
        borderColor={COLORS.green}
        borderWidth={0}
        textColor={COLORS.white}
      />
         <HeightSpacer height={30}/>
    </View>
    </View>
    </View>
    </View>
  )
}

export default SelectedRoom

const styles = StyleSheet.create({})
  