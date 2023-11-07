import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import Colors from '../../constants/Colors'
import AppText from '../Text/AppText'

export default function AppButton(props) {
    return (
        <TouchableOpacity style={{...styles.container, ...props.style}} onPress={props.onPress}>
            <AppText style={{...styles.text, ...props.style}}>{props.title}</AppText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.card,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent:'center',
        alignSelf:'center',
        padding: 12,
        width: '100%',
        // alignContent: 'center'
      },
      text: {
        color: 'white',
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        // alignSelf:'center'
      },
})
