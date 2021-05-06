/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  NavigationContainer,
  createAppContainer,
  createSwitchNavigator,
} from '@react-navigation/native';

import {navigationRef} from './src/helpers/navigationRef';
import MovieListScreen from './src/screens/MovieListScreen';
import MovieDetailsScreen from './src/screens/MovieDetailsScreen';

const Stack = createStackNavigator();

// const switchNavigator = createStackNavigator({
//   MovieList: MovieListScreen,
//   MovieDetails: MovieDetailsScreen,
// });

const App = () => {
  return (
    <Stack.Navigator initialRouteName="MovieList">
      <Stack.Screen
        name="MovieList"
        component={MovieListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView behavior={'height'} style={{flex: 1}}>
        <NavigationContainer>
          <App ref={navigator => navigationRef(navigator)} />
        </NavigationContainer>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
