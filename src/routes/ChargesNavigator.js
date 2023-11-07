import React from 'react';
import {View, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from "react-native-responsive-fontsize";

import Dashboard from '../screens/Dashboard'
import ChargesDetails from '../screens/ChargesDetails'
import MaintenanceCharges from '../screens/MaintenanceCharges'
import ChargesInvoiceDetails from '../screens/ChargesInvoiceDetails'
import Profile from '../screens/Profile'
import Maps from '../screens/Maps'
import Inspection from '../screens/Inspection'
import CollectionStatus from '../screens/CollectionStatus';
import ChangeType from '../screens/ChangeType'
import SectorSelection from '../screens/SectorSelection' 
import StreetSelection from '../screens/StreetSelection';
import ChangeSectorSelection from '../screens/ChangeSectorSelection';
import ChangeStreetSelection from '../screens/changeStreetSelection';
import AllPlots from '../screens/allPlots';

import Colors from '../constants/Colors'

const Stack = createStackNavigator();

const ChargesNavigator = (props) => (
    
    <Stack.Navigator>
        <Stack.Screen
            name="Dashboard"
            options={{
                headerShown: false,
                headerBackTitle: null,
                headerStyle: {
                    backgroundColor: Colors.card,
                    elevation: 10,
                },
                headerTitleStyle: {
                    color: 'white',
                    fontSize: RFValue(20)
                },
                headerTintColor: Colors.card,
                // headerRight: () => (
                //     <View style={{flexDirection: 'row'}}>
                //         <TouchableOpacity>
                //             <Icon name="power" color="white" size={RFValue(25)} style={{padding: 5, marginRight:25}} />
                //         </TouchableOpacity>
                //     </View>
                // ),
                // headerLeft: (prop) => (
                //     <TouchableOpacity onPress={prop.navigation.openDrawer('DrawerNavigator')}>
                //         <Icon name="menu" color={Colors.card} size={RFValue(25)} style={{padding: 5, marginRight:25}} />
                //     </TouchableOpacity>
                // ),
            }}
            component={Dashboard}
        />
        <Stack.Screen
            name="Selector Selection"
            options={{
                headerShown: false,
                headerBackTitle: null,
                headerStyle: {
                    backgroundColor: '#054949',
                    // elevation: 10,
                },
                headerTitleStyle: {
                    color: 'white',
                    // alignSelf:'center',
                    fontWeight:'bold',
                    fontSize:RFValue(12)
                },
                // headerTintColor: '#054949',
                headerBackImage: () => (
                    <Icon name="chevron-left" color="white" size={RFValue(25)} />
                ),
            }}
            component={SectorSelection}
        />
        <Stack.Screen
            name="Street Selection"
            options={{
                headerShown: false,
                headerBackTitle: null,
                headerStyle: {
                    backgroundColor: '#054949',
                    // elevation: 10,
                },
                headerTitleStyle: {
                    color: 'white',
                    // alignSelf:'center',
                    fontWeight:'bold',
                    fontSize:RFValue(12)
                },
                // headerTintColor: '#054949',
                headerBackImage: () => (
                    <Icon name="chevron-left" color="white" size={RFValue(25)} />
                ),
            }}
            component={StreetSelection}
        />
        <Stack.Screen
            name="Maintenance Charges Payment"
            options={{
                headerShown: false,
                headerBackTitle: null,
                headerStyle: {
                    backgroundColor: Colors.card,
                    elevation: 10,
                },
                headerTitleStyle: {
                    color: 'white',
                    // alignSelf:'center',
                    fontWeight:'bold'
                },
                headerTintColor: Colors.card,
                headerBackImage: () => (
                    <Icon name="chevron-left" color="white" size={RFValue(25)} />
                ),
            }}
            component={MaintenanceCharges}
        />
        <Stack.Screen
            options={{
                headerShown: true,
                headerBackTitle: null,
                headerStyle: {
                    backgroundColor: Colors.card,
                    elevation: 10,
                },
                headerTitleStyle: {
                    color: 'white',
                    // alignSelf:'center',
                    fontWeight:'bold'
                },
                headerTintColor: Colors.card,
                headerBackImage: () => (
                    <Icon name="chevron-left" color="white" size={RFValue(25)} />
                ),
            }}
            name="Charges Details"
            component={ChargesDetails}
        />
        <Stack.Screen
            options={{
                headerShown: true,
                headerBackTitle: null,
                headerStyle: {
                    backgroundColor: Colors.card,
                    elevation: 10,
                },
                headerTitleStyle: {
                    color: 'white',
                    fontWeight:'bold'
                },
                headerTintColor: Colors.card,
                headerBackImage: () => (
                    <Icon name="chevron-left" color="white" size={RFValue(25)} />
                ),
                headerLeft: (prop) => (
                    <HeaderBackButton
                        {...prop}
                        onPress={() => {
                        props.navigation.navigate('Maintenance Charges Payment');
                        }}
                    />
                ),
            }}
            name="Charges Invoice Details"
            component={ChargesInvoiceDetails}
        />
        <Stack.Screen
            name="Profile"
            options={{
                headerShown: true,
                headerBackTitle: null,
                headerStyle: {
                    backgroundColor: Colors.card,
                    elevation: 10,
                },
                headerTitleStyle: {
                    color: 'white',
                    // alignSelf:'center',
                    fontWeight:'bold'
                },
                headerTintColor: Colors.card,
                headerBackImage: () => (
                    <Icon name="chevron-left" color="white" size={RFValue(25)} />
                ),
            }}
            component={Profile}
        />
        <Stack.Screen
            name="SynBack"
            options={{
                headerShown: true,
                headerBackTitle: null,
                headerStyle: {
                    backgroundColor: Colors.card,
                    elevation: 10,
                },
                headerTitleStyle: {
                    color: 'white',
                    // alignSelf:'center',
                    fontWeight:'bold'
                },
                headerTintColor: Colors.card,
                headerBackImage: () => (
                    <Icon name="chevron-left" color="white" size={RFValue(25)} />
                ),
            }}
            component={Maps}
        />
        <Stack.Screen
            name="Inspection"
            options={{
                headerShown: true,
                headerBackTitle: null,
                headerStyle: {
                    backgroundColor: Colors.card,
                    elevation: 10,
                },
                headerTitleStyle: {
                    color: 'white',
                    // alignSelf:'center',
                    fontWeight:'bold'
                },
                headerTintColor: Colors.card,
                headerBackImage: () => (
                    <Icon name="chevron-left" color="white" size={RFValue(25)} />
                ),
            }}
            component={Inspection}
        />
        <Stack.Screen
            name="Collection Status"
            options={{
                headerShown: false,
                headerBackTitle: null,
                headerStyle: {
                    backgroundColor: Colors.card,
                    elevation: 10,
                },
                headerTitleStyle: {
                    color: 'white',
                    // alignSelf:'center',
                    fontWeight:'bold'
                },
                headerTintColor: Colors.card,
                headerBackImage: () => (
                    <Icon name="chevron-left" color="white" size={RFValue(25)} />
                ),
            }}
            component={CollectionStatus}
        />
        <Stack.Screen
            name="Change Type"
            options={{
                headerShown: false,
                headerBackTitle: null,
                headerStyle: {
                    backgroundColor: Colors.card,
                    elevation: 10,
                },
                headerTitleStyle: {
                    color: 'white',
                    // alignSelf:'center',
                    fontWeight:'bold'
                },
                headerTintColor: Colors.card,
                headerBackImage: () => (
                    <Icon name="chevron-left" color="white" size={RFValue(25)} />
                ),
            }}
            component={ChangeType}
        />
        <Stack.Screen
            name="Change Sector Selection"
            options={{
                headerShown: false,
                headerBackTitle: null,
                headerStyle: {
                    backgroundColor: Colors.card,
                    elevation: 10,
                },
                headerTitleStyle: {
                    color: 'white',
                    // alignSelf:'center',
                    fontWeight:'bold'
                },
                headerTintColor: Colors.card,
                headerBackImage: () => (
                    <Icon name="chevron-left" color="white" size={RFValue(25)} />
                ),
            }}
            component={ChangeSectorSelection}
        />
        <Stack.Screen
            name="changeStreet"
            options={{
                headerShown: false,
                headerBackTitle: null,
                headerStyle: {
                    backgroundColor: Colors.card,
                    elevation: 10,
                },
                headerTitleStyle: {
                    color: 'white',
                    // alignSelf:'center',
                    fontWeight:'bold'
                },
                headerTintColor: Colors.card,
                headerBackImage: () => (
                    <Icon name="chevron-left" color="white" size={RFValue(25)} />
                ),
            }}
            component={ChangeStreetSelection}
        />
        <Stack.Screen
            name="allpolats"
            options={{
                headerShown: false,
                headerBackTitle: null,
                headerStyle: {
                    backgroundColor: Colors.card,
                    elevation: 10,
                },
                headerTitleStyle: {
                    color: 'white',
                    // alignSelf:'center',
                    fontWeight:'bold'
                },
                headerTintColor: Colors.card,
                headerBackImage: () => (
                    <Icon name="chevron-left" color="white" size={RFValue(25)} />
                ),
            }}
            component={AllPlots}
        />
        
    </Stack.Navigator>
)

export default ChargesNavigator;
