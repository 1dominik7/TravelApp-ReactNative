import { ScrollView, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import reusable from "../../components/Reusable/reusable.style";
import { ReusableText, HeightSpacer, Recommendations } from "../../components";
import Places from '../../components/Home/Places'
import { COLORS, TEXT } from "../../constants/theme";
import { AntDesign } from "@expo/vector-icons";
import styles from "./home.style";
import BestHotels from "../../components/Home/BestHotels";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={reusable.container}>
      <ScrollView>
        <View style={reusable.rowWithSpace("space-between")}>
          <ReusableText
            text={"Hey User!"}
            family={"regular"}
            size={TEXT.large}
            color={COLORS.black}
          />

          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate("Search")}
          >
            <AntDesign name="search1" size={26} />
          </TouchableOpacity>
        </View>

        <HeightSpacer height={15} />

        <ReusableText
          text={"Places"}
          family={"medium"}
          size={TEXT.large}
          color={COLORS.black}
        />
        
        <Places />

        <HeightSpacer height={15}/>

        <Recommendations />

        <HeightSpacer height={15}/>

        <BestHotels />
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
