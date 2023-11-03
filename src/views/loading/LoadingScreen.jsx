import { View, Text, Image, StatusBar, LogBox } from 'react-native';
import React from 'react';
import styles from './styles';
import colors from '../../constants/colors'

LogBox.ignoreLogs(['`new NativeEventEmitter()` was called with a non-null argument without the required `addListener` method.', '`new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` method.']);

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor={colors.white} barStyle="light-content" />
      
      <Image source={require('../../images/logo.png')} style={styles.image} />
      <Text style={styles.text}>TransVoiceHub</Text>
    </View>
  );
};

export default LoadingScreen;
