import { View, Image, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TopBookings, TopInfo, TopTrips } from "../screens";
import { COLORS, SIZES } from "../constants/theme";
import {
  AppBar,
  AssetImage,
  HeightSpacer,
  ReusableBtn,
  ReusableText,
} from "../components";
import styles from "./topTab.style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Tab = createMaterialTopTabNavigator();

const TopTab = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    checkExistingUser();
  }, []);

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem("id");
    const token = await AsyncStorage.getItem("token");
    const userId = JSON.parse(id);
    const accessToken = JSON.parse(token);

    try {
      if (userId !== null) {
        try {
          const response = await axios.get(
            "http://192.168.1.107:5003/api/users",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (response.status === 200) {
            setUserData(response.data);
            if (userId === response.data._id) {
              setUserLogin(true);
              setUserData(response.data);
            } else {
              Alert.alert(
                "Incorrect Account ",
                "Please login with your own account ",
                [
                  {
                    text: "Cancel",
                    onPress: () => {},
                  },
                  {
                    text: "Continue",
                    onPress: () => navigation.navigate("AuthTop"),
                  },
                  { defaultIndex: 1 },
                ]
              );
            }
          }
        } catch (error) {
          console.log("Failed to get data", error);
        }
      } else {
      }
    } catch (error) {
      console.log("Error retrieving the data:", error);
    }
  };

  const userLogout = async () => {
    try {
      await AsyncStorage.multiRemove(["token", "id"]);
      navigation.replace("Bottom");
    } catch (error) {
      console.log("Error loggin out the user:", error);
    }
  };
  if (userLogin === false) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.lightWhite,
          justifyContent: "center",
        }}
      >
        <View>
          <AssetImage
            data={{
              uri: "https://cdn.pixabay.com/photo/2019/10/08/04/16/dragon-palace-hotel-4534092_960_720.jpg",
            }}
            width={"100%"}
            height={300}
            mode={"contain"}
          />

          <HeightSpacer height={90} />

          <View style={{ marginLeft: 30 }}>
            <ReusableBtn
              onPress={() => navigation.navigate("AuthTop")}
              btnText={"S I G N I N"}
              width={SIZES.width - 60}
              backgroundColor={COLORS.green}
              borderColor={COLORS.green}
              borderWidth={0}
              textColor={COLORS.white}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: COLORS.lightWhite }}>
        <View>
          <AssetImage
            data={require("../assets/images/travel.jpg")}
            width={"100%"}
            height={280}
            mode={"cover"}
            onPress={() => navigation.navigate("Home")}
          />

          <AppBar
            top={40}
            left={20}
            right={20}
            color={COLORS.white}
            icon={"logout"}
            color1={COLORS.white}
            onPress1={() => {
              userLogout();
            }}
          />

          <View style={styles.profile}>
            <Image
              source={{
                uri: userData.profile,
              }}
              style={styles.image}
            />

            <HeightSpacer height={5} />

            <View style={{ alignItems: "center" }}>
              <ReusableText
                text={userData ? userData.username : "Could not load you name"}
                family={"medium"}
                size={SIZES.medium}
                color={COLORS.lightWhite}
              />
            </View>

            <HeightSpacer height={5} />

            <View style={styles.name}>
              <View style={{ alignItems: "center" }}>
                <ReusableText
                  text={userData ? userData.email : "user@gmail.com"}
                  family={"medium"}
                  size={SIZES.medium}
                  color={COLORS.white}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <Tab.Navigator>
        <Tab.Screen name="Bookings">
          {() => <TopBookings userId={userData._id} navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen name="Trips" component={TopTrips} />
        <Tab.Screen name="Info" component={TopInfo} />
      </Tab.Navigator>
    </View>
  );
};

export default TopTab;
