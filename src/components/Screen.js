import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'

export default function Screen(props) {
    return (
        <SafeAreaView style={{...styles.screen, ...props.style}}>
            {props.children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
      },
})
