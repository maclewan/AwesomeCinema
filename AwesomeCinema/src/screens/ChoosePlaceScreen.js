import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import Sit from '../components/Sit';

const ChoosePlaceScreen = ({route, navigation}) => {
  const item = route.params?.item ?? null;
  const hour = route.params?.hour ?? null;

  useEffect(() => {
    // get data from API
    // display room's state
  });

  return (
    <View style={styles.container}>
      <Text stlye={styles.title}>{item.title}</Text>
      <View style={styles.dateContainer}>
        <Text style={styles.day}></Text>
        <Text style={styles.hour}></Text>
      </View>
      <Text style={styles.header}>Wybierz miejsce</Text>
      <View style={styles.legendContainer}></View>
      <View style={styles.sitsContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#000',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  day: {
    fontSize: 18,
    color: '#777',
  },
  hour: {
    fontSize: 18,
    color: '#777',
  },
  header: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default ChoosePlaceScreen;
