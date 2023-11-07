import React, {useState, useEffect} from 'react'
import { View, Dimensions } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'

import SignUP from './src/screens/SignUp'
import ChargesNavigator from './src/routes/ChargesNavigator'
import DrawerNavigator from './src/routes/DrawerNavigator'

import authStorage from './src/auth/storage'
import AuthContext from './src/auth/context'


export default function App() {
  const window = Dimensions.get('window')
  const [user, setUser] = useState(null)
  const [userID, setUserID] = useState(null);
  const [ready, setReady] = useState(true);

  useEffect(() => {
    (async () => {
      const sess = await authStorage.getSession();
      const id = await authStorage.getUserID();
       console.log("apppid",id)
      if (sess !== null) {
        setUser(sess);
        setUserID(id);
      }
      setReady(false);
    })();
  }, []);
  if (ready) {
    return (
      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: window.height,
        }}>
      </View>
    );
  }
  return (
    <AuthContext.Provider
      value={{user, setUser, userID, setUserID}}>
      {user ? <DrawerNavigator/> : <SignUP />}
    </AuthContext.Provider>
  );
}


