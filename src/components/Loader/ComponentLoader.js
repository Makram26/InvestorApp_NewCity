import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import Colors from '../../constants/Colors'

export default function ComponentLoader() {
    return (
        <View style={styles.loader}>
            <ActivityIndicator size={100} color={Colors.card} />
            <Text style={styles.loaderText}>Loading...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    loader: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10000,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(45, 45, 45, 0.7)'
    },
    loaderText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.card,
    }
})
