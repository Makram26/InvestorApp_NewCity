import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Colors from '../../constants/Colors'

export default function SectorCard({name, onMove}) {
    return (
        <TouchableOpacity style={styles.container} onPress={onMove}>
           <Text style={styles.containerText}>{name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        // borderColor: '#707070',
        // borderWidth: 0.5,
        padding: 10,
        width: RFPercentage(11),
        height: RFPercentage(8),
        alignItems:'center',
        alignContent:'center',
        justifyContent:'center',
        marginVertical:15,
        marginHorizontal:10,
        borderRadius: 10,
        shadowColor:'black',
        shadowOffset:{
            width:0, height:2
        },
        shadowRadius:6,
        shadowOpacity:0.26,
        elevation:8,
        backgroundColor:'#F9F9F9',
        // flex: 2
    },
    containerText: {
        fontSize:RFValue(20),
        color: '#333333'
    }
})
