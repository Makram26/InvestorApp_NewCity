import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Icon from 'react-native-vector-icons/FontAwesome5'
import Colors from '../../constants/Colors'


export default function MaintenanceCard({ street, units, amount, onPress, disabled}) {
    return (
        <View style={styles.screen}>
            {/* <TouchableOpacity style={styles.card} onPress={onPress}>
                <View style={styles.content1}>
                    <Icon
                        name = "home"
                        size = {RFValue(25)}
                        color = {Colors.card}
                    />
                    <Text style={styles.name}>{category}</Text>
                </View>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7} disabled={disabled}>
                <View style={styles.leftContainer}>
                    <Text style={styles.type}>{street}</Text>
                </View>
                <View style={styles.rightContainer}>
                    <View style={{alignItems:'flex-start'}}>
                        <View style={styles.content}>
                            <Icon
                                name = "home"
                                size = {RFValue(25)}
                                color = {Colors.card}
                            />
                            <Text style={styles.name}>Total Units:</Text>
                            <Text style={styles.name}>{units}</Text>
                        </View>
                        <View style={styles.content1}>
                            <Icon
                                name = "money-bill-alt"
                                size = {RFValue(25)}
                                color = {Colors.card}
                            />
                            <Text  style={styles.name}>Due Amount:</Text>
                            <Text style={styles.name}>{amount}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex:1,
        backgroundColor:'white'
    },
    card: {
        // borderColor: 'black',
        // borderWidth: 1,
        marginVertical: 10,
        // padding: 10,
        width: '90%',
        alignSelf:'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // shadowColor:'black',
        // shadowOffset:{
        //     width:0, height:2
        // },
        // shadowRadius:6,
        // shadowOpacity:0.26,
        // elevation:8,
        // backgroundColor:'white',
        // // padding:20,
        // borderRadius:10,
        // overflow:'hidden',

    },
    leftContainer: {
        // borderColor: 'blue',
        // borderWidth: 1,
        padding: 10,
        width: '26%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: Colors.card,
        borderRadius:30,
        shadowColor:'black',
        shadowOffset:{
            width:0, height:2
        },
        shadowRadius:6,
        shadowOpacity:0.26,
        elevation:8,
        backgroundColor: Colors.card
        // padding:20,
    },
    rightContainer: {
        // borderColor: 'red',
        // borderWidth: 1,
        padding: 8,
        width: '73%',
        marginLeft: 5,
        borderRadius:30,
        shadowColor:'black',
        shadowOffset:{
            width:0, height:2
        },
        shadowRadius:6,
        shadowOpacity:0.26,
        elevation:8,
        backgroundColor:'#F9F9F9',
        // padding:20,
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical:10,
        // alignItems:'flex-start'
    },
    content: {
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginVertical:10
    },
    content1: {
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginVertical:10,
        // alignContent:'center',
        // alignSelf:'center'
    },
    heading:{
        fontSize: RFValue(15),
        fontWeight: 'bold',
        color: '#828181'
    },
    text: {
        fontSize: RFValue(18),
        fontWeight:'900',
        color: '#333333'
    },
    name: {
        marginLeft: 15,
        fontWeight:'600',
        fontSize: RFValue(18),
        fontFamily: "Roboto-Light",
        color: Colors.textColor
    },
    type: {
        fontSize: RFValue(20),
        fontWeight:'bold',
        color:'white',
        fontFamily: "Raleway-lightItalic"
    },
    date:{
        fontSize: RFValue(15),
        fontWeight:'bold',
        color:'white',
        fontFamily: "Raleway-lightItalic",
    }  
})
