import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import MapView, {Marker} from 'react-native-maps'

const HotelMap = ({coordinates}) => {

  const inital = {
    id: coordinates?.id,
    latitude: coordinates?.latitude,
    longitude: coordinates?.longitude,
    latitudeDelta: coordinates?.latitudeDelta,
    longitudeDelta: coordinates?.longitude,
    name: coordinates?.name
  }

  if(coordinates === undefined) {
    return (
      <ActivityIndicator />
    )
  }
  return (
    <TouchableOpacity onPress={() => {}}>
        <MapView style={styles.maps} initialRegion={inital}>
            <Marker coordinate={coordinates} title={undefined ? coordinates?.name : "Hotel Destination"}  />
        </MapView>
    </TouchableOpacity>
  )
}

export default HotelMap

const styles = StyleSheet.create({
    maps:{
        marginVertical: 10,
        height: 120,
        width: "100%",
        borderRadius: 12
    }
})