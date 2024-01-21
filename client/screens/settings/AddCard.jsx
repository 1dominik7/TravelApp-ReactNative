import { Alert, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { AppBar, HeightSpacer, ReusableBtn } from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import { CreditCardInput } from "react-native-credit-card-input";
import axios from "axios";
import checkUser from "../../hook/checkUser";

const AddCard = ({ navigation }) => {
  const [searchKey, setSearchKey] = useState({});

  const {userLogin,userData ,isLoading, time} = checkUser()

const onChange = (form) => setSearchKey(form)

  const handleButton = () =>{

    const userId = userData._id

    const card ={
      cardNumber: searchKey.values.number,
      cardHolderName: searchKey.values.name,
      cardExpDate: searchKey.values.expiry,
      cvc: searchKey.values.cvc,
      cardType: searchKey.values.type
    }

        axios.post('http://192.168.1.107:5003/api/users/cards', {userId, card}).then((res) =>{
          setTimeout(() => {
            navigation.goBack()
          },500)
        }).catch(err =>{
      Alert.alert("Error", "Failed to add card")
      console.log("error",err)
    })
  }
  

  return (
    <View style={{ backgroundColor: COLORS.lightWhite, flex: 1}}>
      <View style={{ height: 40,  marginTop: 50 }}>
        <AppBar
          title={"Add Card"}
          top={10}
          left={20}
          onPress={()=> navigation.goBack()}
        />
      </View>
   

      <View style={{ marginHorizontal: 5 }}>
      <HeightSpacer height={20} />
      <CreditCardInput 
      onChange={onChange}
      requiresName={true}
      />
     
      </View>

      <View>
      <View style={{ position: "absolute",alignItems: "center", right: 0, left: 0, top: 40}}>
          <ReusableBtn
            btnText={"Add Card"}
            width={SIZES.width- 60}
            backgroundColor={COLORS.red}
            borderColor={COLORS.red}
            borderWidth={0.5}
            textColor={COLORS.white}
            onPress={handleButton}
          />
      </View>
      </View>
    </View>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  inputStyle: {
    paddingVertical: 20,
    paddingLeft: 10,
    backgroundColor: COLORS.lightWhite,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },
});
