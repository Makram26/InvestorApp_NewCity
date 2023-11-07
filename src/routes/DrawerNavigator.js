import React, {useContext, useEffect} from 'react';
import {View, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ChargesNavigator from './ChargesNavigator'
import {ModalPortal} from 'react-native-modals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../auth/context';
import useAuth from '../auth/useAuth';

import AppButton from '../components/Button/AppButton'

function Logout({navigation}) {
    const {user, setUser} = useContext(AuthContext);
  
    const window = Dimensions.get('window');
    
    const logout = async () => {
     await AsyncStorage.removeItem("@user_ID");
      useAuth().logOut();
      setUser(null);
    };
   
    return (
        <View
            style={{
                width: '70%',
                marginHorizontal: '15%',
                marginTop: window.height * 0.7,
                alignItems: 'center',
            }}
        >
        
            <AppButton
                title='LogOut'
                onPress={logout}
                style={{borderRadius: 10, width: '70%'}}
            />
        </View>
    );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
      <Drawer.Navigator drawerContent={() => <Logout />}>
        <Drawer.Screen name="Main" component={ChargesNavigator} />
      </Drawer.Navigator>
    );
}

export default function DrawerNavigator() {
    return (
        <NavigationContainer independent={true}>
            <MyDrawer />
            <ModalPortal />
        </NavigationContainer>
    )
}


