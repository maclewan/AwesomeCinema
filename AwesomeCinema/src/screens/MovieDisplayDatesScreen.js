import React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';

import {BackgroundImage} from 'react-native-elements/dist/config';
import {LinearGradient} from 'expo-linear-gradient';

import MovieDate from '../components/MovieDate';

const createGroupedDatesList = dates => {
  const tempDates = [...dates];
  for (let i = 0; i < tempDates.length; i++) {
    const newDate = new Date();
    newDate.setTime(Date.parse(tempDates[i]));
    tempDates[i] = newDate;
  }
  let day = `${tempDates[0].getDate()}.0${tempDates[0].getMonth()}`;
  let hours = [`${tempDates[0].getHours()}:${tempDates[0].getMinutes()}`];

  let currDay;

  const result = [];

  for (let i = 1; i < tempDates.length; i++) {
    currDay = `${tempDates[i].getDate()}.0${tempDates[i].getMonth()}`;

    if (currDay === day) {
      hours.push(`${tempDates[i].getHours()}:${tempDates[i].getMinutes()}`);
    } else {
      const dict = {day, hours};
      result.push(dict);
      day = currDay;
      hours = [`${tempDates[i].getHours()}:${tempDates[i].getMinutes()}`];
    }
  }
  console.log('====================================');
  console.log(result);
  console.log('====================================');
  return result;
};

const MovieDisplayDatesScreen = ({route, navigation}) => {
  const item = route.params?.item ?? null;
  const {width, height} = Dimensions.get('window');

  return (
    <View style={{flex: 1, width: width, height: height}}>
      <View style={styles.container}>
        <BackgroundImage
          source={{uri: item.backdrop}}
          style={{
            width,
            height: height * 0.5,
            flex: 1,
            resizeMode: 'cover',
            alignSelf: 'center',
          }}
        />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'white']}
          style={{
            height: height * 0.3,
            width,
            position: 'absolute',
            bottom: 0,
          }}
        />
      </View>
      <View style={[styles.container, {alignItems: 'center', justifyContent: 'center'}]}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.reservation}>Daty seansów</Text>
        <FlatList
          data={createGroupedDatesList(item.dates)}
          keyExtractor={item => item.day}
          renderItem={({item, index}) => <MovieDate item={item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reservation: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
  },
  description: {
    marginTop: 10,
    fontSize: 15,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#F16365',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default MovieDisplayDatesScreen;
