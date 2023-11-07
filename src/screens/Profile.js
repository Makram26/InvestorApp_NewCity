import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import AppText from '../components/Text/AppText'
import Colors from '../constants/Colors'

import Icon from 'react-native-vector-icons/FontAwesome5'


export default function Profile({navigation}) {
    return (
        <View style={styles.screen}>
            <View style={{marginVertical:150}}>
                <Text style={styles.text}>Coming Soon...</Text>
            </View>
            {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Icon
                    name="arrow-left"
                    color={Colors.card}
                    size={RFValue(25)}
                />
            </TouchableOpacity>
            <View style={styles.imageContainer}>
                <Image 
                    source={require('../assets/images/user-male.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.userName}>Hello Shahid Mehmood</Text>
                <View style={styles.border}></View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>Amount Collected</Text>
                    <Text style={styles.collected}>PKR 24000</Text>
                </View>
                <View style={styles.border}></View>
                <View style={styles.detailsContainer}>
                <View>
                    <AppText>Name</AppText>
                    <AppText>Age</AppText>
                    <AppText>Phone No</AppText>
                    <AppText>Title</AppText>
                    <AppText>Type</AppText>
                </View>
                <View>
                    <AppText>Gender</AppText>
                    <AppText>Staus</AppText>
                    <AppText>Last Active</AppText>
                    <AppText>Date of Birth</AppText>
                    <AppText>Type</AppText>
                </View>
            </View>
            <View style={styles.cardContainer}>
                <View style={styles.card1}>
                    <Text style={{color:'white',fontSize: RFValue(12)}}>PKR 24000</Text>
                    <Text style={{color:'white', fontWeight:'bold', fontSize: RFValue(20)}}>PKR 24000</Text>
                </View>
                <View style={styles.card2}>
                    <Text style={{color:'white',fontSize: RFValue(12)}}>PKR 24000</Text>
                    <Text style={{color:'white', fontWeight:'bold', fontSize: RFValue(20)}}>PKR 24000</Text>
                </View>
                <View style={styles.card3}>
                    <Text style={{color:'white',fontSize: RFValue(12)}}>PKR 24000</Text>
                    <Text style={{color:'white', fontWeight:'bold', fontSize: RFValue(20)}}>PKR 24000</Text>
                </View>
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor:'white'
    },
    text: {
        alignSelf:'center',
        fontSize:40,
        color: Colors.card
    },
    backButton:{
        padding:5,
        marginLeft:10,
        marginTop:10,
        width:'10%'
    },
    imageContainer:{
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').width * 0.35,
        // borderRadius: (Dimensions.get('window').width * 0.7) / 2,
        overflow: 'hidden',
        // marginTop: Dimensions.get('window').width / 40,
        alignSelf:'center',
        // flexDirection:'row',
        alignItems:'flex-start'
    },
    image:{
        width: '100%',
        height: '100%'
    },
    userName: {
        alignSelf: 'center',
        fontSize: RFValue(20),
        fontWeight:'900',
        color: Colors.textColor
    },
    border: {
        borderColor: 'black',
        borderWidth: 0.5,
        marginTop: Dimensions.get('window').width / 30,
    },
    amountContainer: {
        marginVertical: Dimensions.get('window').width / 30,
    },
    amount: {
        alignSelf: 'center',
        fontSize:RFValue(12),
        color: Colors.textColor
    },
    collected: {
        alignSelf:'center',
        fontSize: RFValue(25),
        fontWeight: 'bold',
        marginTop:5
    },
    detailsContainer: {
        marginVertical: Dimensions.get('window').width / 30,
        width: '95%',
        alignSelf: 'center',
        padding: 10,
        flexDirection:'row',
        justifyContent:'space-around',
        backgroundColor: 'white',
        borderRadius: 15,
        shadowOffset:{
            width:0, height:2
        },
        shadowRadius:6,
        shadowOpacity:0.26,
        elevation:8,
    },
    cardContainer: {
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginVertical: Dimensions.get('window').width / 30,
        // borderWidth: 1,
        // borderColor:'blue',
        height: 110
    },
    card1: {
        // borderWidth: 1,
        // borderColor:'black',
        padding:10,
        borderRadius: 10,
        backgroundColor:'#D7A9E3FF',
        shadowOffset:{
            width:0, height:2
        },
        shadowRadius:6,
        shadowOpacity:0.26,
        elevation:8,
        justifyContent:'space-around',
        width: '30%',
        alignItems:'center'
    },
    card2: {
        // borderWidth: 1,
        // borderColor:'black',
        padding:10,
        borderRadius: 10,
        backgroundColor:'#8BBEE8FF',
        shadowOffset:{
            width:0, height:2
        },
        shadowRadius:6,
        shadowOpacity:0.26,
        elevation:8,
        justifyContent:'space-around',
        // height: '5%'
        width: '30%',
        alignItems:'center'
    },
    card3: {
        // borderWidth: 1,
        // borderColor:'black',
        padding:10,
        borderRadius: 10,
        backgroundColor:'#A8D5BAFF',
        shadowOffset:{
            width:0, height:2
        },
        shadowRadius:6,
        shadowOpacity:0.26,
        elevation:8,
        justifyContent:'space-around',
        width: '30%',
        alignItems:'center'
    }
})
