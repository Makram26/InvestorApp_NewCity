import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Colors from '../constants/Colors'

export default function Inspection() {
    return (
        <View style={styles.screen}>
            <View style={{marginVertical:150}}>
                <Text style={styles.text}>Coming Soon...</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems:'center'
    },
    text: {
        alignSelf:'center',
        fontSize:40,
        color: Colors.card
    }
})
