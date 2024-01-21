import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import styles from "./signin.style";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, SIZES } from "../../constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HeightSpacer, ReusableBtn, WidthSpacer } from "../../components";
import axios from "axios";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  email: Yup.string().email("Provide a valid email").required("Required"),
});

const Signin = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [obsecureText, setObsecureText] = useState(false);

  const errorLogin = () =>{
    Alert.alert("Invalid Form", "Please provide all required fields"),[
      {
        text: "Cancel",
        onPress: () => {},
      },
      {
        text: "Continue",
        onPress: () => {},
      },
    ]
  }

  const login = async (values) => {
    setLoader(true);

    try {
      const endpoint = "http:///192.168.1.107:5003/api/login";
      const data = values;

      const response = await axios.post(endpoint, data);
      if (response.status === 200) {
        setLoader(false);
        setResponseData(response.data);
        await AsyncStorage.setItem("id", JSON.stringify(responseData.id));
        await AsyncStorage.setItem("token", JSON.stringify(responseData.token));

      
        navigation.replace("Bottom");
      } else {
        Alert.alert("Error Logging in ", "Please provide valid credentials ", [
          {
            text: "Cancel",
            onPress: () => {},
          },
          {
            text: "Continue",
            onPress: () => {},
          },
        ]);
      }
    } catch (error) {
      Alert.alert(
        "Error ",
        "Oops, Error logging in try again with correct credentials",
        [
          {
            text: "Cancel",
            onPress: () => {},
          },
          {
            text: "Continue",
            onPress: () => {},
          },
          { defaultIndex: 1 },
        ]
      );
    } finally {
      setLoader(false);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
            login(values)
        }}
      >
        {({
          handleChange,
          touched,
          handleSubmit,
          values,
          errors,
          isValid,
          setFieldTouched,
        }) => (
          <View>
            <View style={styles.wrapper}>
              <Text style={styles.label}>Email</Text>
              <View>
                <View
                  style={styles.inputWrapper(
                    touched.email ? COLORS.lightBlue : COLORS.lightGrey
                  )}
                >
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={20}
                    color={COLORS.gray}
                  />
                  <WidthSpacer width={10}/>
                  <TextInput 
                    placeholder="Enter email"
                    onFocus={() => {setFieldTouched('email')}}
                    onBlue={() => {setFieldTouched('email', "")}}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{flex:1}}
                  />
                </View>
                {touched.email && errors.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                )}
              </View>
            </View>
            <View style={styles.wrapper}>
              <Text style={styles.label}>Password</Text>
              <View>
                <View
                  style={styles.inputWrapper(
                    touched.password ? COLORS.lightBlue : COLORS.lightGrey
                  )}
                >
                  <MaterialCommunityIcons
                    name="lock-outline"
                    size={20}
                    color={COLORS.gray}
                  />
                  <WidthSpacer width={10}/>
                  <TextInput 
                    secureTextEntry={obsecureText}
                    placeholder="Enter password"
                    onFocus={() => {setFieldTouched('password')}}
                    onBlue={() => {setFieldTouched('password', "")}}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{flex:1}}
                  />
                  <TouchableOpacity onPress={() => {
                    setObsecureText(!obsecureText)
                  }}>
                    <MaterialCommunityIcons 
                        name={obsecureText ? "eye-outline" : "eye-off-outline"}
                        size={18}
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                )}
              </View>
            </View>
            <HeightSpacer height={10}/>

            <ReusableBtn
          onPress={isValid ? handleSubmit : errorLogin}
          btnText={"SIGN IN"}
          width={SIZES.width - 40}
          backgroundColor={COLORS.green}
          borderColor={COLORS.green}
          borderWidth={0}
          textColor={COLORS.white}
        />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Signin;
