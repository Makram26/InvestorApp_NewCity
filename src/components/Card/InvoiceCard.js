import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { RFValue } from "react-native-responsive-fontsize";
import Colors from '../../constants/Colors'

export default function InvoiceCard({name, date, amount, paid}) {
    return (
        <View style={styles.card}>
            <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between',alignItems:'center'}}>
                <Text style={{fontWeight:'bold',fontSize:RFValue(15), color:Colors.card}}>INV#</Text>
                <Text style={{marginVertical:20,fontSize:RFValue(15)}}>{name}</Text>
            </View>
            <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between',alignItems:'center'}}>
                <Text style={{fontWeight:'bold',fontSize:RFValue(15), color:Colors.card}}>Due Date</Text>
                <Text style={{marginVertical:20,fontSize:RFValue(15)}}>{date}</Text>
            </View>
                                    
            <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between',alignItems:'center'}}>
                <Text style={{fontWeight:'bold',fontSize:RFValue(15), color:Colors.card}}>Due Amount</Text>
                <Text style={{marginVertical:20,fontSize:RFValue(15)}}>{amount}</Text>
            </View>
            <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between',alignItems:'center'}}>
                <Text style={{fontWeight:'bold',fontSize:RFValue(15), color:Colors.card}}>Paid Amount</Text>
                <Text style={{marginVertical:20,fontSize:RFValue(15)}}>{paid}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        // borderWidth:1,
        // borderColor:'purple',
        width:'95%',
        alignSelf:'center',
        padding:5,
        marginTop:10
    }
})
