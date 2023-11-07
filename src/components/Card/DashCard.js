import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from '../../constants/Colors'
import AppText from '../../components/Text/AppText'

export default function DashCard({
    title,
    icon,
    cardStyle,
    lastCard = false,
    onMove,
}) {
    return (
        <TouchableOpacity onPress={onMove}>
            <View style={[styles.container, cardStyle]}>
                <Image 
                    source={icon}
                    style={styles.image}
                    resizeMode="contain"
                />
                <View style={styles.detailContainer}>
                    <AppText style={styles.title}> {title} </AppText>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#F9F9F9',
        width: RFValue(102),
        height: RFValue(96),
        marginVertical: RFValue(15),
        marginHorizontal: RFValue(20),
        alignItems: 'center',
        borderRadius: 20,
        borderColor: 'white',
        borderWidth: 0.4,
        elevation: 8,
        // shadowColor: 'white',
        shadowOpacity:0.26,
        shadowRadius:6,
        shadowColor:'black',
        shadowOffset:{
            width:0, height:2
        },
        shadowRadius:6,
        justifyContent:'space-evenly'
    },
    title: {
        color: Colors.textColor,
        fontSize: RFValue(15),
        fontWeight:"bold"
    },
    image: {
        width: '60%',
        height: '60%'
    }
})
