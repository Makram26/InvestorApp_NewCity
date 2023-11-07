import React from 'react'
// import LottieView from 'lottie-react-native'

export default function AppLoader({ visible = false}) {
  if (!visible) return null;

    return (
        // <LottieView
        //   autoPlay
        //   loop
        //   style={{
        //     width: 100,
        //     height: 100,
        //     alignSelf: 'center',
        //   }}
        //   source={require('../../assets/animation/loader.json')}
        // />
        <View></View>
    )
}
