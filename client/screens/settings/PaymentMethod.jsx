import { View, StyleSheet, FlatList, Alert } from "react-native";
import React from "react";
import { AppBar, HeightSpacer, Payment, ReusableBtn, ReusableText } from "../../components";
import { TEXT, COLORS,SIZES } from "../../constants/theme";
import checkUser from "../../hook/checkUser";
import { CardView } from "react-native-credit-card-input";
import axios from "axios";

const PaymentMethod = ({ navigation }) => {

  const {userLogin,userData ,isLoading, time} = checkUser()

  const deleteCardHandler = (item) =>{

    const data = {
      cardId: item
    }
    
    axios.delete(`http://192.168.1.107:5003/api/users/cards/${userData._id}`,{data}).then((res) =>{
      
    }).catch(err =>{
  Alert.alert("Error", "Failed to delete card")
  console.log("error",err)
      
})    
  }

  return (
    <View style={{ backgroundColor: COLORS.lightWhite, flex: 1,   }}>
      <View style={{ height: 50,  marginTop: 40 }}>
        <AppBar
          top={10}
          left={15}
          title={"Payment Methods"}
          onPress={() => navigation.goBack()}
          
        />
      </View>

      <View style={{ marginHorizontal: 25 }}>
        <HeightSpacer height={10} />
        <ReusableText
          text={"Select Your Payment Method"}
          family={"regular"}
          size={TEXT.xLarge - 5}
          color={COLORS.black}
        />

        <HeightSpacer height={10} />

        <Payment
          title={"Visa Card"}
          image={require("../../assets/images/Visa.png")}
        />

        <HeightSpacer height={10} />

        <Payment
          title={"Mastercard"}
          image={require("../../assets/images/Mastercard.png")}
        />

        <HeightSpacer height={10} />

        <Payment
          title={"PayPal"}
          image={require("../../assets/images/PayPal.png")}
        />

        <HeightSpacer height={10} />
        <ReusableText
          text={"Your cards"}
          family={"regular"}
          size={TEXT.xLarge - 5}
          color={COLORS.black}
        />

        <HeightSpacer height={10} />
        {isLoading ?
           ( <HorizontalShimmer
            horizontal={false}
            width={'100%'}
            height={95}
            radius={12}
            paddingTop={12}
          />)
        :
          <FlatList
          data={userData?.cards}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ columnGap: SIZES.medium}}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{flexDirection:'column', alignItems:'center'}}>
                     <ReusableBtn
          onPress={() => deleteCardHandler(item._id)}
            btnText={"Delete Card"}
            width={SIZES.width - 100}
            backgroundColor={'purple'}
            borderColor={COLORS.red}
            borderWidth={0.5}
            textColor={COLORS.white}
          />
            <CardView
            key={item._id}
            number={item?.cardNumber}
            name={item?.cardHolderName}
            brand={item?.cardType}
            />
            </View>
          )}
            />
        }
        <View style={{ position: "absolute", top: SIZES.height - 220 }}>
          <ReusableBtn
            btnText={"Add Payment Method"}
            width={SIZES.width - 50}
            backgroundColor={COLORS.white}
            borderColor={COLORS.blue}
            borderWidth={0.5}
            textColor={COLORS.blue}
          />
          <HeightSpacer height={10} />
          <ReusableBtn
          onPress={()=> navigation.navigate('AddCard')}
            btnText={"Add Card"}
            width={SIZES.width - 50}
            backgroundColor={COLORS.red}
            borderColor={COLORS.red}
            borderWidth={0.5}
            textColor={COLORS.white}
          />
        </View>
      </View>
    </View>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  checkbox: {
    alignSelf: "center",
  },
});
