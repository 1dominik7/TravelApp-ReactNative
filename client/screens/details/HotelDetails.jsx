import { View, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, {  useState } from 'react'
import { AppBar, DescriptionText, HeightSpacer, HotelMap, NetworkImage, ReusableBtn, ReusableText, ReviewsList } from '../../components'
import { COLORS, SIZES } from '../../constants/theme'
import styles from './hotelDetails.style'
import reusable from '../../components/Reusable/reusable.style'
import {Rating} from 'react-native-stock-star-rating'
import {Feather} from '@expo/vector-icons'
import fetchHotelById from '../../hook/fetchHotelById'
import { useRoute } from '@react-navigation/native'
import Loader from '../../components/Shimmers/Loader'
import checkUser from '../../hook/checkUser'
import CalendarPicker from 'react-native-calendar-picker'
import { format } from 'date-fns'
 
const HotelDetails = ({navigation}) => {

  const { userLogin } = checkUser();
  const router = useRoute()
  const id = router.params

  const [range, setRange] = useState()
  const [openCalendar, setOpenCalendar] = useState(false)

  const {hotel, coordinates, isLoading, error, refetch} = fetchHotelById(id)

  const handleReviews = () => {
    if (userLogin) {
      navigation.navigate("AddReviews", id);
    } else {
      Alert.alert("Auth Error", "Please login to add comments", [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "Continue",
          onPress: () => {navigation.navigate('AuthTop')},
        },
      ]);
    }
  };

  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date(Date.now() + ( 3600 * 1000 * 24)));

const onDateChange = (date, type) => {
    if(type === "END_DATE"){
      setSelectedEndDate(date)
    }
    else{
      setSelectedStartDate(date)
      setSelectedEndDate(null)
    }
}

const minDate = new Date(); // Today
const maxDate = new Date(2026, 1, 1);
const startDate = selectedStartDate === null ? "" : format(selectedStartDate, 'dd/MM/yyyy');
const endDate = selectedEndDate === null ? "" : format(selectedEndDate, 'dd/MM/yyyy');

let date1 = selectedStartDate;
let date2 = selectedEndDate;
let timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
let numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
const nights = numberOfNights

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <ScrollView>
      <View style={{height: 80}}>
      <AppBar
        top={50}
        left={20}
        right={20}
        title={hotel?.title?.length > 20 ? hotel?.title?.slice(0,20)+"...": hotel?.title}
        color={COLORS.white}
        icon={"message1"}
        color1={COLORS.white}
        onPress={() => navigation.goBack()}
        onPress1={handleReviews}
      />
      </View>
      <View>
        <View style={styles.container}>
          <NetworkImage
            source={hotel.imageUrl}
            width={"100%"}
            height={220}
            radius={25}
          />

          <View style={styles.titleContainer}>
            <View style={styles.titleColumn}>
              <ReusableText
                text={hotel.title}
                family={"medium"}
                size={SIZES.large}
                color={COLORS.black}
              />

              <HeightSpacer height={10} />
              <ReusableText
                text={hotel.location}
                family={"medium"}
                size={SIZES.medium}
                color={COLORS.black}
              />

              <HeightSpacer height={15} />

              <View style={reusable.rowWithSpace("space-between")}>
                <Rating
                  maxStars={5}
                  stars={hotel.rating}
                  bordered={false}
                  color={"#FD9942"}
                />

                <ReusableText
                  text={`(${hotel.review})`}
                  family={"medium"}
                  size={SIZES.medium}
                  color={COLORS.gray}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.container, { paddingTop: 90 }]}>
          <ReusableText
            text={"Description"}
            family={"medium"}
            size={SIZES.large}
            color={COLORS.black}
          />

          <HeightSpacer height={10} />

          <DescriptionText text={hotel.description} />

          <HeightSpacer height={10} />

          <ReusableText
            text={"Location"}
            family={"medium"}
            size={SIZES.large}
            color={COLORS.black}
          />

          <HeightSpacer height={15} />

          <ReusableText
            text={hotel.location}
            family={"regular"}
            size={SIZES.small+2}
            color={COLORS.gray}
          />

          <HotelMap coordinates={coordinates}/>

          <View style={reusable.rowWithSpace('space-between')}>
          <ReusableText
            text={'Reviews'}
            family={"medium"}
            size={SIZES.large}
            color={COLORS.black}
          />

          <TouchableOpacity  onPress={() => navigation.navigate("AllReviews", id)}>
            <Feather name='list' size={20}/>
          </TouchableOpacity>
          </View>

          <HeightSpacer height={10}/>

          <ReviewsList reviews={hotel.reviews}/>

        </View>
        <View style={[reusable.rowWithSpace('space-between'), styles.bottom]}>
          <View>
          <TouchableOpacity onPress={() => setOpenCalendar(!openCalendar)}>
          <ReusableText
            text={`\$ ${selectedEndDate !== null ? hotel.price * nights : "Select Check-out date"}`}
            family={"medium"}
            size={selectedEndDate !==null ? SIZES.large : SIZES.small}
            color={COLORS.black}
          />
          <HeightSpacer height={5}/>
          <ReusableText
            text={`${startDate}- ${endDate}`}
            family={"medium"}
            size={SIZES.small}
            color={COLORS.gray}
          />
          {openCalendar === true &&
                <View style={{position:"absolute", bottom:70, left:-10 ,Index:10, backgroundColor:"white", borderRadius:10}}>
                <CalendarPicker
                    width={350}
                    startFromMonday={true}
                    allowRangeSelection={true}
                    minDate={minDate}
                    maxDate={maxDate}
                    todayBackgroundColor="blue"
                    selectedDayColor="#7300e6"
                    selectedDayTextColor="#FFFFFF"
                    onDateChange={onDateChange}
                      />
            </View>
          }
          </TouchableOpacity>
          </View>
          {
          selectedEndDate !== null ?
          <ReusableBtn
          onPress={() => navigation.navigate("SelectRoom", {hotel:hotel, startDate:startDate, endDate:endDate})}
          btnText={"Select Room"}
          width={(SIZES.width - 50)/2.2}
          backgroundColor={COLORS.green}
          borderColor={COLORS.green}
          borderWidth={0}
          textColor={COLORS.white} 
        />
        :
        <ReusableBtn
        btnText={"Select Room"}
        width={(SIZES.width - 50)/2.2}
        backgroundColor={COLORS.lightGrey}
        borderColor={COLORS.green}
        borderWidth={0}
        textColor={COLORS.white} 
      />
          }
          </View>
      </View>
    </ScrollView>
  )
}

export default HotelDetails