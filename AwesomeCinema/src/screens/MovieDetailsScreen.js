import React from 'react';
import {Text, View, ScrollView} from 'react-native';

const MovieDetailsScreen = ({route}) => {
  const item = route.params?.item ?? null;
  return (
    <ScrollView>
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
    </ScrollView>
  );
};

export default MovieDetailsScreen;
