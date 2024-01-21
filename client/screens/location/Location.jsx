import {StyleSheet, View } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps'

const Location = () => {

  const coordinates = {
    latitude: 50.05100622906321,
    longitude: 21.409628994256895,
    latitudeDelta:0.01,
    longitudeDelta:0.01,
    title: "My location"
  }

  return (
    <View style={styles.container}>
    <MapView initialRegion={coordinates} style={styles.map}>
        <Marker coordinate={coordinates} title={coordinates?.title}/>
    </MapView>
    </View>
  )
}

export default Location

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
}) 