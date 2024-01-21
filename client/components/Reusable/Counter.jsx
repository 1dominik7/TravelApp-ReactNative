import { View } from 'react-native'
import React from 'react'
import {AntDesign} from '@expo/vector-icons'
import reusable from './reusable.style'
import { COLORS, SIZES } from '../../constants/theme'
import ReusableText from './ReusableText'

const Counter = ({maxPeople, count, setCount}) => {

    const increment = () => {
      if(count < maxPeople){
        setCount(count + 1)
      }
    }
    const decrement = () => {
        if(count > 1){
            setCount(count - 1)
        }
    }
  return (
    <View style={reusable.rowWithSpace('flex-start')}>
      <AntDesign 
        name="minussquareo"
        size={26}
        color={count === 1 ? COLORS.lightGrey : COLORS.gray}
        onPress={decrement}
      />
  <ReusableText
            text={`  ${count}  `}
            family={"regular"}
            size={SIZES.medium}
            color={COLORS.black}
          />
<AntDesign 
        name="plussquareo"
        size={26}
        color={count === maxPeople ? COLORS.lightGrey :COLORS.gray}
        onPress={increment}
      />
    </View>
  )
}

export default Counter
