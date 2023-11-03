import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from '../views/home/HomeScreen';
import TranslateScreen from '../views/translate/TranslateScreen';
import SpeechScreen from '../views/speech/SpeechScreen';
import MeaningScreen from '../views/meaning/MeaningScreen';
import LanguageScreen from '../views/language/LanguageScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
             name="Meaning"
             component={MeaningScreen}
             options={{ headerShown: false }}
          />

          <Stack.Screen
             name="Language"
             component={LanguageScreen}
             options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Translate"
            component={TranslateScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Speech"
            component={SpeechScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
  // }
};

export default RootNavigator;

const styles = StyleSheet.create({});
