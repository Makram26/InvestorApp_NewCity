import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Icon from 'react-native-vector-icons/FontAwesome5'
import Colors from '../../constants/Colors'

export default function ChangeSectorCard({onPress, category}) {
    return (
        <View style={styles.screen}>
            <TouchableOpacity style={styles.card} onPress={onPress}>
                <Icon
                    name = "torii-gate"
                    size = {RFValue(25)}
                    color = {Colors.card}
                    style={styles.icon}
                />
                <Text style={styles.name}>{category}</Text>
            </TouchableOpacity>
        </View> 
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white'
    },
    card: {
        flexDirection:'row',
        // borderColor:'blue',
        // borderWidth:1,
        // alignItems:'center',
        width:'95%',
        alignSelf:'center',
        // alignContent:'center',
        marginVertical:5,
        padding:10,
        borderRadius:10,
        shadowOffset:{
            width:0, height:2
        },
        shadowRadius:6,
        shadowOpacity:0.26,
        elevation:8,
        backgroundColor:'white'
    },
    name: {
        marginLeft: 15,
        fontWeight:'600',
        fontSize: RFValue(20),
        fontFamily: "Roboto-Light",
        color: Colors.textColor,
        // alignSelf:'center'
    },
    icon: {
        marginLeft: 5,
        // alignSelf:'center'
    },
    content1: {
        // marginLeft:10,
        alignItems:'center'
    }
})
