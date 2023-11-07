import authStorage from './storage'

export default useAuth = () => {
    const logIn = (sessionID, userID, partnerID, name) => {
        authStorage.storeSession(sessionID, userID, partnerID, name)
    };

    const logOut = () => {
        authStorage.deleteSession()
    }

    return {logIn, logOut}
}