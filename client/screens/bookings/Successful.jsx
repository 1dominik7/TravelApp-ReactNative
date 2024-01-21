import { View } from 'react-native'
import React from 'react'
import { AssetImage, HeightSpacer, ReusableBtn, ReusableText } from '../../components'
import { COLORS, SIZES, TEXT } from '../../constants/theme'
import { useRoute } from '@react-navigation/native'
import ReusableTile from '../../components/Reusable/ReusableTile'


const Successful = ({navigation}) => {
  const router = useRoute()
  const {item, startDate, endDate} = router.params

  const buttonHandler = () =>{
    navigation.navigate("Bottom") 
  }

  return (
    <View>
      <View style={{marginTop: "20%"}}>
        <AssetImage 
            data={require('../../assets/images/checked.png')}
            width={'100%'}
            height={200}
            mode={'contain'}
        />
        <HeightSpacer height={40}/>
        <View style={{alignItems: "center"}}>
        <ReusableText
        text={'Booking Successful'}
        family={"medium"}
        size={TEXT.xLarge}
        color={COLORS.black}
      />
         <HeightSpacer height={20}/>
        <ReusableText
        text={'You can find your booking details below'}
        family={"regular"}
        size={SIZES.medium}
        color={COLORS.gray}
      />
     <HeightSpacer height={20}/>
        </View>
        <View style={{margin: 20}}>
        <ReusableText
        text={'Room Details'}
        family={"bold"}
        size={SIZES.medium}
        color={COLORS.dark}
      />
        <HeightSpacer height={20}/>
        <ReusableTile
        item={item}/>
        <HeightSpacer height={10}/>
          <ReusableText
        text={`${startDate} - ${endDate}`}
        family={"bold"}
        size={SIZES.medium}
        color={COLORS.dark}
      />
        <HeightSpacer height={20}/>
        <ReusableBtn
          onPress={buttonHandler}
          btnText={"Done"}
          width={SIZES.width - 50}
          backgroundColor={COLORS.green}
          borderColor={COLORS.green}
          borderWidth={0}
          textColor={COLORS.white}
        />
        </View>
      </View>
    </View>
  )
}

export default Successful