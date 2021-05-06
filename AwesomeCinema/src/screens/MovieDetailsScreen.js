import React from 'react';
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {BackgroundImage} from 'react-native-elements/dist/config';
import {LinearGradient} from 'expo-linear-gradient';

const MovieDetailsScreen = ({route}) => {
  const item = route.params?.item ?? null;
  const {width, height} = Dimensions.get('window');
  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
      style={styles.container}>
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
      <View
        style={[
          styles.container,
          {
            paddingHorizontal: 30,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </ScrollView>
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
    marginBottom: 20,
  },
  description: {
    fontSize: 15,
  },
});

export default MovieDetailsScreen;
