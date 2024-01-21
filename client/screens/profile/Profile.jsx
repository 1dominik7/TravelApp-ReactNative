import { View, Image } from 'react-native'
import React from 'react'
import { COLORS, SIZES, TEXT } from '../../constants/theme'
import { AppBar, HeightSpacer, ReusableText } from '../../components'
import checkUser from '../../hook/checkUser'
import HorizontalShimmer from '../../components/Shimmers/HorizontalShimmer'

const Profile = ({navigation}) => {

  const {userLogin,userData ,isLoading, time} = checkUser()

  return (
    <>
    {isLoading ? 
       <HorizontalShimmer
        horizontal={false}
        width={'100%'}
        height={95}
        radius={12}
        paddingTop={12}
      />
      :
    <View style={{ backgroundColor: COLORS.lightWhite, flex: 1 }}>
      <View style={{ height: 100 }}>
        <AppBar
          top={50}
          left={20}
          right={20}
          color={COLORS.white}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <View style={{alignItems:'center'}}>
        <Image
            source={{uri: userData?.profile}}
            style={{width:150, height: 150, borderRadius:100, resizeMode:'contain'}}
        />
        </View>
        <HeightSpacer height={25} />
        <ReusableText
          text={"Personal Information"}
          family={"regular"}
          size={SIZES.xLarge}
          color={COLORS.black}
        />
        <HeightSpacer height={15} />
        <View style={{ flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
        <ReusableText
        text={"Username :"}
        family={"regular"}
        size={TEXT.large}
        color={COLORS.black}
        />
          <ReusableText
        text={userData?.username}
        family={"regular"}
        size={TEXT.large}
        color={COLORS.black}
        />
        </View>
          <HeightSpacer height={15} />
          <View style={{ flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
        <ReusableText
        text={"Email :"}
        family={"regular"}
        size={TEXT.large}
        color={COLORS.black}
        />
          <ReusableText
        text={userData?.email}
        family={"regular"}
        size={TEXT.large}
        color={COLORS.black}
        />
        </View>
        <HeightSpacer height={15} />
        <View style={{ flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
        <ReusableText
        text={"Number of reservations :"}
        family={"regular"}
        size={TEXT.large}
        color={COLORS.black}
        />
          <ReusableText
        text={userData?.reservation.length}
        family={"regular"}
        size={TEXT.large}
        color={COLORS.black}
        />
        </View>
      </View>
    </View>
      }
      </>
  )
}

export default Profile