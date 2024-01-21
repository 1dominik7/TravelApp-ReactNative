import { View, Text, StyleSheet, FlatList, Alert, Image  } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../../constants/theme'
import reusable from '../../components/Reusable/reusable.style'
import { ReusableBtn, ReusableHotel } from '../../components'
import HorizontalShimmer from '../../components/Shimmers/HorizontalShimmer'
import fetchReservations from '../../hook/fetchReservations'
import axios from 'axios'


const TopBookings = ({navigation, userId}) => {

  const {reservation, isLoading, error, refetch} = fetchReservations(userId)
  
  const [openDetails, setOpenDetails] = useState(null) 
  
  const cancelReservation = async (item) =>{
    try{
     await axios.delete(`http://192.168.1.107:5003/api/reservation/${item}`)
        refetch()
    }catch(error){
      console.log(error);
    }
  }

  const openAlert = (item) =>{
    Alert.alert("Cancel Reservation", "Are you sure you want to cancel this reservation?", [
      {
        text: "Yes, cancel",
        onPress: () => cancelReservation(item),
      },
      {
        text: "No, don't cancel it",
        onPress: () => {},
      },
    ]);
  }

  const openDetailsHandler = (index) =>{
    if(openDetails === index){
      setOpenDetails(null)
    }else{
      setOpenDetails(index)
    }
  }

  const dateConverter = (timeEnd) => {
    const newStartDate= new Date();
    const date1 = timeEnd.split("/")
    let newEndDate = new Date(+date1[2], date1[1] - 1, +date1[0]); 
    const one_day = 1000*60*60*24;
    let result
    result = Math.ceil((newEndDate.getTime()-newStartDate.getTime())/(one_day))
    if (result < 0 ) {return 0}
    return result
  }

  return (
    <>
    {isLoading ? 
      ( <HorizontalShimmer
        horizontal={false}
        width={'100%'}
        height={95}
        radius={12}
        paddingTop={12}
      />)
      :
    <View style={{margin: 20, height:"70%"}}>
      {(reservation.length !== 0 ) ?
      <>
      <FlatList 
        data={reservation}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={({item, index}) => (
          <View style={{backgroundColor: COLORS.lightWhite, marginBottom:10, borderRadius: 16}}>
            <View>
              <ReusableHotel item={item.hotel} onPress={() => navigation.navigate("HotelDetails", item?.hotel)}/>
            </View>
            {openDetails === index &&
            <View style={{margin:10, gap:2}}>
              <View style={{display:'flex', flexDirection:'row'}}>
                <Text>Check-in/out date: {item.startDate}</Text>
                <Text>- {item.endDate}</Text>
              </View>
              <Text>Room: {item?.title}</Text>
              <Text>Guest: {item?.guest}</Text>
              <Text>Price : ${item?.price}</Text>
            </View>
            }
            <View style={[reusable.rowWithSpace('space-between') , {margin: 10}]}>
            <ReusableBtn
          onPress={() => openDetailsHandler(index)}
          btnText={"Details"}
          width={(SIZES.width - 50)/2.2}
          backgroundColor={openDetails === index ? COLORS.lightBlue : COLORS.white}
          borderColor={COLORS.blue}
          borderWidth={0.5}
          textColor={openDetails === index ? COLORS.white : COLORS.lightBlue}
        />
          {
            dateConverter((item.startDate)) > 2 &&
          <ReusableBtn
          onPress={() => openAlert(item._id)}
          btnText={"Cancel"}
          width={(SIZES.width - 50)/2.2}
          backgroundColor={COLORS.red}
          borderColor={COLORS.red}
          borderWidth={0}
          textColor={COLORS.white}
        />
          }
            </View>
          </View>
        )}
      />
      </>
      :
      <View style={{marginTop:10, alignItems:"center", justifyContent:"center" , flex:1}}>
        <Text style={{fontSize:16}}>No booking yet.</Text>
        <Image source={require("../../assets/images/NoReservation.png")} style={{width:200, height:200}}/>
      </View>
      }
    </View>}
    </>
  )
}

export default TopBookings

const styles = StyleSheet.create({})