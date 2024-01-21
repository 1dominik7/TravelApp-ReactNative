import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import reusable from "./reusable.style";
import { COLORS, SIZES } from "../../constants/theme";
import fetchHotelById from "../../hook/fetchHotelById";
import { Image } from "react-native";
import Loader from "../Shimmers/Loader";
import ReusableText from "./ReusableText";
import WidthSpacer from "./WidthSpacer";
import HeightSpacer from "./HeightSpacer";
import Rating from "./Rating";

const ReusableHotel = ({ item, onPress }) => {

    const {hotel, coordinates, isLoading, error, refetch} = fetchHotelById(item)
 
    if (isLoading) {
        return (
          <Loader />
        );
      }

  return (
    
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={reusable.rowWithSpace("flex-start")}>
        <Image
          source={{uri: hotel.imageUrl}}
          width={80}
          height={80}
          radius={12}
        />

        <WidthSpacer width={15} />

        <View>
          <ReusableText
            text={hotel.title}
            family={"medium"}
            size={SIZES.medium}
            color={COLORS.black}
          />
          <HeightSpacer height={8} />

          <ReusableText
            text={hotel.location}
            family={"medium"}
            size={14}
            color={COLORS.gray}
          />

          <HeightSpacer height={8} />

          <View style={reusable.rowWithSpace("flex-start")}>
            <Rating rating={hotel.rating}/>
            <WidthSpacer width={5}/>
            <ReusableText
              text={` (${hotel.review}) `}
              family={"medium"}
              size={14}
              color={COLORS.gray}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReusableHotel;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },
});
