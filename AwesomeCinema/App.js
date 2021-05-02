/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {SafeAreaView} from 'react-native-safe-area-context';

import {navigationRef} from './src/helpers/navigationRef';
import MovieListScreen from './src/screens/MovieListScreen'

const switchNavigator = createSwitchNavigator({
  MovieList: MovieListScreen,
});

const App = createAppContainer(switchNavigator);
export default () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <App ref={navigator => navigationRef(navigator)} />
    </SafeAreaView>
  );
};
