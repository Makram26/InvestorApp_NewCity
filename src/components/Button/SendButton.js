import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function SendButton({onPress}) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
           <Text style={styles.text}>
                Submit
           </Text>

            <Icon
                name = 'send'
                size = {22}
                style= {styles.icon} 
            />
       </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#f6ab00",
        borderRadius: 25,
        width: 150,
        //height: '20%',
        paddingLeft: 10,
        flexDirection: 'row',
        padding: 13,
        alignContent: 'center',
        marginTop: 70,
        marginRight: 20
    },
    text: {
        color: "white",
        fontSize: 20,
        paddingLeft: 14,
        fontWeight: 'bold'
    },
    icon: {
        paddingLeft: 15,
        paddingTop: 2,
        color: "white",
        justifyContent:'flex-end'
    }
})
