import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function AppText(props) {
    return (
        <Text style={{...styles.title, ...props.style}}>
            {props.children}
        </Text>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'sans-serif',
        fontSize: RFValue(18)
    }
})
