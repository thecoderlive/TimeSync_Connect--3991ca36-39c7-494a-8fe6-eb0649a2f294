import React, { useState, useEffect, useReducer } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, View, TouchableOpacity, Image } from 'react-native'

import { actionCreators, initialState, reducer } from './reducer'
import { api } from './api'
import { data } from './data'
import * as items from './real_time_experiences_data'
import LiveFeeds from './LiveFeeds'

function RealTimeExperiences({ navigation, route }){ 
const url = (api.real_time_experiences ?? "real_time_experiences/") + (route?.params?.id ?? '')
const [state, dispatch] = useReducer(reducer, initialState)

const { item, history, loading, error } = state

const onPressCheckIn = () => {}

async function getItem() {
      dispatch(actionCreators.loading())

      try {
        if (url in history){
           dispatch(actionCreators.local(history[url]))
        } else if (url.indexOf('http') > -1){
          const response = await fetch(url)
          const json = await response.json()
          if(json){
            dispatch(actionCreators.success(route.params?.id ? json : json[0], url))
          }   
        } else {
          const json = route.params?.id ? data[route.params?.id] : items.item
          dispatch(actionCreators.success(json, url))
        }
      } catch (e) {
        dispatch(actionCreators.failure())
      }
    }

useEffect(() => {
    getItem();
}, []);
  
if (loading) {
    return (
        <View style={styles.center}>
        <ActivityIndicator animating={true} />
        </View>
    )
}

return(
<ScrollView style={styles.real_time_experiences} showsVerticalScrollIndicator={false}>
<LiveFeeds item={'live_feeds' in item ? item.live_feeds: item} navigation={navigation}/>
<Image
    style={styles.location_map}
    source={{uri: item.location_map}}
    />
<TouchableOpacity  onPress={onPressCheckIn}>
    <View style={styles.check_in}>{'Check In'}</View>
</TouchableOpacity>
</ScrollView>
)}

export default RealTimeExperiences;

const styles = StyleSheet.create({
    "center": {
        "flex": 1,
        "alignItems": "center",
        "justifyContent": "center"
    },
    "check_in": {
        "flex": 1,
        "color": "white",
        "margin": 5,
        "padding": 10,
        "textAlign": "center",
        "backgroundColor": "#1ACDA5"
    },
    "location_map": {
        "width": "100vw",
        "height": "100vw",
        "marginTop": 5
    }
});