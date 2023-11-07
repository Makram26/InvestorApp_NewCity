import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Screen from '../Screen'
import Colors from '../../constants/Colors'
import AppText from '../Text/AppText'

export default function Header({onPress}) {
    return (
        <View style={styles.header}>
            {/* <TouchableOpacity
                onPress={onPress}
                style={styles.headerButtonStyle}>
                <Icon name="menu" color={Colors.card} size={36} />
            </TouchableOpacity> */}
            <View style={{flexGrow: 0.1}}></View>
            <AppText style={{fontSize: 24, color: 'white', fontWeight:'bold'}}>
                Dashboard
            </AppText>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.card,
        padding: 10,
        flex: 0.12,
    },
    headerButtonStyle: {
        borderColor: 'white',
        borderWidth: 5,
        backgroundColor: 'white',
        borderRadius: 50,
    },
})
