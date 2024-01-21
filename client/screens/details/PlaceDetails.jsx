import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import {
  AppBar,
  DescriptionText,
  HeightSpacer,
  NetworkImage,
  PopularListHotel,
  ReusableBtn,
  ReusableText,
} from "../../components/index";
import { COLORS, TEXT, SIZES } from "../../constants/theme";
import reusable from "../../components/Reusable/reusable.style";
import {Feather} from '@expo/vector-icons'
import fetchPlace from "../../hook/fetchPlace";


const PlaceDetails = ({navigation}) => {
  const route = useRoute()
  const id = route.params

  const {place, isLoading, error, refetch} = fetchPlace(id)

  return (
    <ScrollView>
    <View>
      <NetworkImage
        source={place.imageUrl}
        width={"100%"}
        height={350}
        radius={15}
      />
      <AppBar
        top={40}
        left={20}
        right={20}
        title={place.title}
        color={COLORS.white}
        icon={"search1"}
        color1={COLORS.white}
        onPress={() => navigation.goBack()}
        onPress1={() => {}}
      />
    </View>

    <View style={styles.description}>
      <HeightSpacer height={5}/>
      <ReusableText
        text={place.location}
        family={"medium"}
        size={TEXT.large}
        color={COLORS.black}
      />

      <DescriptionText text={place.description} />

      <View style={{ alignContent: "center" }}>
        <HeightSpacer height={5} />

        <View style={reusable.rowWithSpace("space-between")}>
          <ReusableText
            text={"Popular Hotels"}
            family={"medium"}
            size={TEXT.large}
            color={COLORS.black}
          />

        <TouchableOpacity onPress={() => navigation.navigate('PopularHotels', place.country_id)}>
            <Feather name="list" size={20} />
          </TouchableOpacity>
        </View>

        <HeightSpacer height={20} />

        <PopularListHotel data={place.popular} />

        <ReusableBtn
          onPress={() => navigation.navigate("HotelSearch")}
          btnText={"Find Best Hotels"}
          width={SIZES.width - 40}
          backgroundColor={COLORS.green}
          borderColor={COLORS.green}
          borderWidth={0}
          textColor={COLORS.white}
        />
        <HeightSpacer height={50} />
      </View>
    </View>
  </ScrollView>
  )
}

export default PlaceDetails

const styles = StyleSheet.create({
  description: {
    marginHorizontal: 20,
    paddingTop: 20,
  },
})