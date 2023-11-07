import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions, Button, Platform } from 'react-native'

import TitleText from '../components/Text/TitleText'
import AppButton from '../components/Button/AppButton'
import Colors from '../constants/Colors'
import AppText from '../components/Text/AppText'
import AppTextInput from '../components/Text/AppTextInput'

export default function Login() {
    return (
        <View style={styles.screen}>
            {/* <TitleText>Login Screen</TitleText> */}
            <View style={styles.imageContainer}>
                <Image 
                    source={require('../assets/images/logo.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            {/* <View style={{flex:2}}> */}
                <View style={styles.userContainerStyle}>
                    <AppText style={styles.userTitle}>Username:</AppText>
                    <AppTextInput
                        placeholderTextColor={Platform.OS == "ios" && "grey"}
                        textStyle={styles.userInput}
                        maxLength={28}
                        autoFocus
                        />
                </View>
                <View style={styles.userContainerStyle}>
                    <AppText style={styles.userTitle}>Password:</AppText>
                    <AppTextInput
                        textStyle={styles.userInput}
                        maxLength={20}
                        placeholderTextColor={Platform.OS == "ios" && "grey"}
                        secureTextEntry={true}
                        
                        // onChangeText={(text) => setFieldValue('password', text)}
                        // value={values['password']}
                        // onBlur={() => setFieldTouched('password')}
                    />
                </View>
            {/* </View> */}
                <View style={styles.buttonContainer}>
                    <AppButton
                        title='Login'
                        // onPress={handleSubmit}
                        style={styles.buttonStyle}
                    />
                </View>
            <View style={styles.signupContainer}>
                <TitleText>New User?</TitleText>
                <TitleText style={styles.signupText}>SignUP</TitleText>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.loginBackground,
        // justifyContent: 'center',
        alignItems:'center'
    },
    imageContainer:{
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        // borderRadius: (Dimensions.get('window').width * 0.7) / 2,
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').width / 30,
        alignSelf:'center'
    },
    image:{
        width: '100%',
        height: '100%'
    },
    buttonContainer: {
        marginHorizontal: '8%',
        marginVertical: 3,
        width: '75%'
    },
    buttonStyle: {
        borderWidth: 5,
        borderColor: Colors.primary,
        borderRadius: 25,
        padding: 2,
    },
    userContainerStyle: {
        flexDirection: 'row',
        marginBottom: 45,
        justifyContent: 'space-evenly',
        alignItems: 'center',
      },
    userTitle: {
        fontSize: 17,
        color: Colors.primary,
        fontWeight: 'bold',
    },
    userInput: {
        borderColor: 'gray',
        borderWidth: 1,
        width: '65%',
        marginLeft: 10,
        borderRadius: 50
    },
    signupContainer: {
        flexDirection: 'row',
        marginTop: 15
    },
    signupText: {
        marginLeft: 10,
        color: 'red'
    },
    signupButton: {
        color : 'red'
    }
})
