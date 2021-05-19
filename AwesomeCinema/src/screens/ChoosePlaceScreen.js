import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';

const ChoosePlaceScreen = ({route, navigation}) => {
  const item = route.params?.item ?? null;

  useEffect(() => {
    // get data from API
    // display room's state
  });

  return (
    <View>
      <Text>ChoosePlaceScreen</Text>
    </View>
  );
};

export default ChoosePlaceScreen;
