import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import {
  AppBar,
  DescriptionText,
  HeightSpacer,
  NetworkImage,
  PopularListPlace,
  ReusableBtn,
  ReusableText,
} from "../../components/index";
import { COLORS, TEXT, SIZES } from "../../constants/theme";
import reusable from "../../components/Reusable/reusable.style";
import {Feather} from '@expo/vector-icons'
import fetchCountry from "../../hook/fetchCountry";

const CountryDetails = ({ navigation }) => {
  const route = useRoute();
  const id  = route.params;
  const {country, isLoading, error, refetch} = fetchCountry(id)
  
  return (
    <ScrollView>
    <View>
      <NetworkImage
        source={country.imageUrl}
        width={"100%"}
        height={350}
        radius={15}
      />
      <AppBar
        top={40}
        left={20}
        right={20}
        title={country.country}
        color={COLORS.white}
        icon={"search1"}
        color1={COLORS.white}
        onPress={() => navigation.goBack()}
        onPress1={() => {}}
      />
    </View>

    <View style={styles.description}>
      <ReusableText
        text={country.region}
        family={"medium"}
        size={TEXT.xLarge}
        color={COLORS.black}
      />

      <DescriptionText text={country.description} />

      <View style={{ alignContent: "center" }}>
        <HeightSpacer height={5} />

        <View style={reusable.rowWithSpace("space-between")}>
          <ReusableText
            text={"Popular Destinations"}
            family={"medium"}
            size={TEXT.large}
            color={COLORS.black}
          />

          <TouchableOpacity onPress={() => navigation.navigate('PlacesByCountry', id)}>
            <Feather name="list" size={20} />
          </TouchableOpacity>
        </View>

        <HeightSpacer height={20} />

        <PopularListPlace data={country.popular} />

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
  );
};

export default CountryDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F4F8",
  },
  description: {
    marginHorizontal: 20,
    paddingTop: 20,
  },
});
