import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'



function LiveFeeds({ item, navigation }){

const onPressJoinLiveFeed = () => {}

function liveFeedsItem({ item }){
return (
<View style={styles.live_feeds_item}>
<Image
    style={styles.live_feed_image}
    source={{uri: item.live_feed_image}}
    />
<View style={{flexDirection: 'row'}}>
<Text style={styles.live_feed_title} numberOfLines={1}>{item.live_feed_title}</Text>
<Text style={styles.live_feed_description}>{item.live_feed_description}</Text>
</View>
<TouchableOpacity  onPress={onPressJoinLiveFeed}>
    <View style={styles.join_live_feed}>{'Join Live Feed'}</View>
</TouchableOpacity>
</View>
)}

return (
<FlatList
    style={styles.live_feeds}
    data={item}
    renderItem={liveFeedsItem}
    keyExtractor={item => item.id}
    showsVerticalScrollIndicator={false}
    />
)}

export default LiveFeeds;

const styles = StyleSheet.create({
    "join_live_feed": {
        "flex": 1,
        "color": "white",
        "margin": "15px",
        "padding": 10,
        "textAlign": "center",
        "backgroundColor": "#1ACDA5",
        "borderRadius": 6
    },
    "live_feed_image": {
        "width": "100vw",
        "height": "100vw",
        "marginTop": 5
    },
    "live_feed_title": {
        "flex": 1,
        "color": "hsl(274,100%,60%)",
        "fontSize": 15,
        "marginTop": 5,
        "fontWeight": "400",
        "marginHorizontal": 10,
        "paddingHorizontal": 2
    },
    "live_feed_description": {
        "fontSize": 12,
        "marginTop": 5,
        "fontWeight": "250",
        "marginHorizontal": 10,
        "paddingHorizontal": 2
    }
});