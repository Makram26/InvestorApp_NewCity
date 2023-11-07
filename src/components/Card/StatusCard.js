import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import Colors from '../../constants/Colors'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function StatusCard({onPress, Sector, Recievable, Recieved, Balance}) {

    
    return (
        <View style={styles.screen}>
           <TouchableOpacity style={styles.tableHead} onPress={onPress}>
                <View style={styles.tableCell}><Text style={styles.tableText}>{Sector}</Text></View>
                <View style={styles.tableCell}><Text style={styles.tableText}>{Recievable}</Text></View>
                <View style={styles.tableCell}><Text style={styles.tableText}>{Recieved}</Text></View>
                {/* <View style={styles.tableCell}><Text style={styles.tableText}>{Balance}</Text></View> */}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white'
    },
    tableHead: {
        // borderColor:'black',
        // borderWidth:1,
        // marginTop:50,
        // padding:2,
        width:'95%',
        alignSelf:'center',
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    tableCell: {
        borderWidth:1,
        borderColor: Colors.card,
        padding:10,
        flex:1,
        textAlign:'center',
        alignItems:'center',
        backgroundColor: 'white'
    },
    tableText: {
        color: Colors.card,
        fontWeight:'bold',
        fontSize: RFValue(15)
    }
})
