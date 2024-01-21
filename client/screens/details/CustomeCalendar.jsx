import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import CalendarPicker from "react-native-calendar-picker";

const CustomeCalendar = () => {

    const [date, setDate] = useState(
        {selectedStartDate:null,
        selectedEndDate: null}
    )

const onDateChange = (date, type) => {
    if (type === "END_DATE") {
      setDate(date)
    } else {
        setDate(date)
    }
  }

  const minDate = new Date(); // Today
  const maxDate = new Date(2026, 1, 1);
    
  return (
    <View style={{position:"absolute", bottom:70, left:-10 ,Index:10, backgroundColor:"white", borderRadius:10}}>
        <CalendarPicker 
            width={350}
            startFromMonday={true}
            allowRangeSelection={true}
            minDate={minDate}
            maxDate={maxDate}
            todayBackgroundColor="blue"
            selectedDayColor="#7300e6"
            selectedDayTextColor="#FFFFFF"
            onDateChange={onDateChange}
              />
    </View>
  )
}

export default CustomeCalendar

const styles = StyleSheet.create({})