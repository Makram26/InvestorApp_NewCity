import AsyncStorage from '@react-native-async-storage/async-storage';

const storeSession = async (sess, id, partnerID, name) => {
    try {
        console.log("name",name)
        await AsyncStorage.setItem('@session_Key', sess);
        await AsyncStorage.setItem('@user_ID', JSON.stringify(id))
        await AsyncStorage.setItem('@partner_ID', JSON.stringify(partnerID));
        await AsyncStorage.setItem('@user_name', name);
    } catch (e) {
        console.log(e)
    }
}

const deleteSession = async () => {
    try {
        await AsyncStorage.removeItem('@session_Key');
        await AsyncStorage.removeItem('@user_ID');
        await AsyncStorage.removeItem('@partner_ID');
    } catch (e) {
        console.log(e)
    }
}

const getSession = async () => {
    try {
        const result = await AsyncStorage.getItem('@session_Key')
        return result;
    } catch (e) {
        console.log(e)
    }
}

const getUserID = async () => {
    try {
      const userID = await AsyncStorage.getItem('@user_ID');
      return userID;
    } catch (e) {
      console.log(e);
    }
};

const getPartnerId = async () => {
    try {
      const userID = await AsyncStorage.getItem('@partner_ID');
      return userID;
    } catch (e) {
      console.log(e);
    }
};

export default {
    storeSession,
    getSession,
    getUserID,
    deleteSession,
    getPartnerId,
};