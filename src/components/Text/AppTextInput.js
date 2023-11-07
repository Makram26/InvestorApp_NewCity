import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

export default function AppTextInput({textStyle, inputStyle, ...otherprops}) {
    return (
        <View style={[styles.container, textStyle]}>
            <TextInput style={[styles.text, inputStyle]} {...otherprops} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
      },
    text: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'sans-serif',
        textAlign: 'center'
    },
})
