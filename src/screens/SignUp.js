import React, { useState, useContext, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native'

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Formik } from 'formik'
import * as Yup from 'yup'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Colors from '../constants/Colors'
import ErrorMessage from '../components/ErrorMessage'
import AppLoader from '../components/Loader/AppLoader';
import  NetInfo  from "@react-native-community/netinfo";
import AuthApi from '../api/auth'
import useAuth from '../auth/useAuth';
import AuthContext from '../auth/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const window = Dimensions.get('window')

const validationSchema = Yup.object().shape({
    userName: Yup.string().required("User Name is required"),
    password: Yup.string().required("Password is required")
})

export default function SignUp({ navigation }) {
    const [dimensions, setDimensions] = useState({ window })
    const { setUser, setUserID } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [keyShow, setKeyShow] = useState(false)
    const [isInternetReachable, setIsInternetReachable] = useState(false)


    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', keyboardDidHide)
        return () => {
            Keyboard.addListener('keyboardDidShow', keyboardDidShow).remove();
            Keyboard.addListener('keyboardDidHide', keyboardDidHide).remove()
        }
    }, [])

    const keyboardDidShow = () => {
        setKeyShow(true);
    };

    const keyboardDidHide = () => {
        setKeyShow(false);
    };

    useEffect(() => {
        // Subscribe
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsInternetReachable(state.isInternetReachable);
            // console.log("Connection type", state.type);
            // console.log("Is internet Reachable?", isInternetReachable);
        });
        return () => {
            unsubscribe();
        };
    },[isInternetReachable]) // in order to re-call the hooks whenever the netInfo status changed 



    const handleSubmit = async ({ userName, password }) => {
        if(isInternetReachable){
        setLoading(true);
        const response = await AuthApi.login(userName, password)
        const sessionString = response.headers['set-cookie'][0];
        const firstEqual = sessionString.indexOf('=');
        const firstColon = sessionString.indexOf(';');
        const sessionID = sessionString.substring(firstEqual + 1, firstColon)
        setLoading(false);
        if (response && response.data && response.data.error && response.data.error.data && response.data.error.data.message){
            Alert.alert("Attention","Invalid username & password ")
        } 
        else{
    //  return setLoading(false);
         await AsyncStorage.setItem('@user_ID', JSON.stringify(response.data.result.uid))
         console.log("AsyncStorage.setItem",AsyncStorage.getItem("@user_ID"))
        useAuth().logIn(
            sessionID,
            response.data.result.uid,
            response.data.result.partner_id,
            response.data.result.name,
        )
        setUser(sessionID);
        setUserID(response.data.result.uid)
        

        // console.log(sessionID)
        }
    }
    else{
        alert("Please Check Your Internet Connection")
    }
    }


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.screen}
        >
            <View style={styles.imageContainer}>
                {keyShow && (
                    // <Icon
                    //     name="user"
                    //     size={RFValue(30)}
                    //     color="white"
                    //     style={{alignSelf:'center'}}
                    // />
                    <Image
                        source={require('../assets/images/logo.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                )}
                {keyShow == false && (
                    //     <Icon
                    //     name="user"
                    //     size={RFValue(100)}
                    //     color="white"
                    //     style={{alignSelf:'center'}}
                    // />

                    <Image
                        source={require('../assets/images/logo.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                )}
                {/* <Icon
                    name="user"
                    size={RFValue(100)}
                    color="white"
                    style={{alignSelf:'center'}}
                /> */}
            </View>
            <Formik
                initialValues={{ userName: '', password: '' }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    setFieldTouched,
                    touched,
                    setFieldValue
                }) => (
                    <>

                        <View style={styles.fieldsContainer}>
                            <Text style={styles.signinText}>Sign In</Text>
                            <View style={styles.usernameConatiner}>

                                <TextInput
                                    placeholder="Username"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    placeholderTextColor={Platform.OS == "ios" && "grey"}
                                    // keyboardType="email-address"
                                    onBlur={() => setFieldTouched("userName")}
                                    // onChangeText={handleChange('email')}
                                    onChangeText={(text) => setFieldValue('userName', text)}
                                    value={values['userName']}
                                    style={styles.userName}
                                    />
                            </View>
                            <ErrorMessage error={errors.userName} visible={touched.userName} />
                            <View style={styles.passwordConatiner}>
                                {/* <Icon
                                    name="lock"
                                    size={20}
                                    color={Colors.card}
                                    style={{marginLeft:10}}
                                /> */}
                                <TextInput
                                    placeholder="Password"
                                    placeholderTextColor={Platform.OS == "ios" && "grey"}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    onBlur={() => setFieldTouched("password")}
                                    // onChangeText={handleChange('password')}
                                    onChangeText={(text) => setFieldValue('password', text)}
                                    value={values['password']}
                                    style={styles.userName}
                                />
                            </View>
                            <ErrorMessage error={errors.password} visible={touched.password} />

                            <TouchableOpacity
                                style={styles.loginButton}
                                // onPress={() => navigation.navigate('Dashboard')}
                                // onPress={() => console.log(email,password)}
                                onPress={handleSubmit}
                            >
                                {loading?
                           <ActivityIndicator size="large" color="white" />:
                            <Text style={styles.loginText}>Login</Text>}
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
            


        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#067878'
    },
    imageContainer: {
        width: Dimensions.get('window').width * 1,
        height: Dimensions.get('window').width * 0.55,
        // borderRadius: (Dimensions.get('window').width * 0.7) / 2,
        overflow: 'hidden',
        // marginTop: Dimensions.get('window').width / 40,
        alignSelf: 'center',
        // flexDirection:'row',
        alignItems: 'flex-start',
        // marginTop: Dimensions.get('window').width * 0.1,
        // borderColor: Colors.card,
        // borderWidth: 15,
        // borderBottomLeftRadius: 90,
        // borderBottomRightRadius: 90,
        // alignContent: 'center',
        justifyContent: 'center',
        // backgroundColor: Colors.card,
        flex: 0.37
    },
    image: {
        width: '85%',
        height: '85%',
        // marginTop: Dimensions.get('window').width * 0.1,
        // color: Colors.card
        alignSelf: 'center'
    },
    signinText: {
        fontSize: RFValue(25),
        marginTop: 30,
        marginLeft: 50,
        fontWeight: 'bold'
    },
    fieldsContainer: {
        backgroundColor: 'white',
        flex: 1,
        // marginTop: Dimensions.get('window').width * 0.1,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60
    },
    usernameConatiner: {
        borderWidth: 2,
        borderColor: Colors.card,
        width: '90%',
        alignSelf: 'center',
        // marginVertical:20,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 50,
        // shadowOffset:{
        //     width:0, height:2
        // },
        // shadowRadius:6,
        // shadowOpacity:0.26,
        // elevation:8,
        backgroundColor: 'white',
        marginTop: Dimensions.get('window').width * 0.1,
    },
    passwordConatiner: {
        borderWidth: 2,
        borderColor: Colors.card,
        width: '90%',
        alignSelf: 'center',
        // marginVertical:20,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 50,
        // shadowOffset:{
        //     width:0, height:2
        // },
        // shadowRadius:6,
        // shadowOpacity:0.26,
        // elevation:8,
        backgroundColor: 'white',
        marginTop: Dimensions.get('window').width * 0.05,
    },
    loginButton: {
        // borderWidth: 1,
        // borderColor: 'purple',
        width: '80%',
        alignSelf: 'center',
        padding: 12,
        backgroundColor: Colors.card,
        shadowOffset: {
            width: 0, height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        borderRadius: 50,
        marginTop: Dimensions.get('window').width * 0.15,
        // flexDirection:'row'
    },
    loginText: {
        fontSize: RFValue(20),
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    userName: {
        paddingLeft: 35,
        fontSize: RFValue(15),
        // borderColor: 'red',
        // borderWidth: 1,
        width: '80%'
    },
    loaderContainer: {
        position: 'absolute',
        backgroundColor: 'rgba(52, 52, 52, 0.4)',
        height: window.height * 0.3,
        width: window.width * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: window.width * 0.25,
    }
})