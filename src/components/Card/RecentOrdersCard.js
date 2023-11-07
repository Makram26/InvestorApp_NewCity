import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { RFValue } from "react-native-responsive-fontsize";
import LinearGradient from 'react-native-linear-gradient';


export default function RecentOrdersCard({amount}) {
    return (
        <LinearGradient colors={['#064E4D', '#0F9096', '#1BE4F3']} style={styles.container}>
            <Text style={styles.mainText}>Payment Collected</Text>
            <View style={{borderColor:'white', borderWidth:0.5, marginVertical:RFValue(15)}}></View>
            <View style={styles.bottomContainer}>
                <View>
                    <Text style={styles.bottomText1}>Rs. {amount}</Text>
                </View>
                {/* <View>
                    <Text style={styles.bottomText}>Text Goes here</Text>
                    <Text style={styles.bottomText1}>0700-0800</Text>
                </View>
                <View>
                    <Text style={styles.bottomText}>Text Goes here</Text>
                    <Text style={styles.bottomText1}>0700-0800</Text>
                </View> */}
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#054545',
        borderRadius: 25,
        padding:7,
        marginTop:RFValue(12),
        width:'75%',
        alignSelf:'center'
    },
    mainText: {
        color: 'white',
        fontWeight:'bold',
        fontSize: RFValue(18),
        alignSelf:'center',
        marginTop:10
    },
    bottomContainer: {
        flexDirection:'row',
        // borderWidth:1,
        // borderColor:'red',
        alignItems:'center',
        justifyContent:'space-evenly',
        marginVertical:RFValue(10),
        // padding:10,
    },
    bottomText: {
        fontSize: RFValue(12),
        color:'white',
        fontWeight:'bold'
    },
    bottomText1: {
        fontSize: RFValue(25),
        color:'white',
        fontWeight:'bold',
        alignSelf:'center'
    }
})
