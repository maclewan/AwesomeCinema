import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const MovieDate = ({item}) => {
  const generateHours = hours =>
    hours.map((hour, index) => (
      <TouchableOpacity
        key={`${hour}-${index}`}
        onPress={() => console.log('navigate to change sits')}>
        <Text style={{color: '#333', margin: 5, fontSize: 16}}>{hour}</Text>
      </TouchableOpacity>
    ));

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{item.day}</Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {generateHours(item.hours)}
      </View>
      <View style={styles.dividor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginHorizontal: 30,
  },
  dateText: {
    fontSize: 22,
    color: '#f5bf42',
  },
  dividor: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

export default MovieDate;
