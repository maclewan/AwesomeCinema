import React, {useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

import AuthForm from '../components/AuthForm';

const AuthScreen = ({navigation}) => {
  const [authType, setAuthType] = useState('sign-in');

  const signIn = (email, password) => {
    // send data to API
    console.log('sign in');
    console.log(email, password);
    navigation.navigate('MovieList');
  };

  const signUp = (email, password, password2) => {
    // send data to API
    console.log('sign up');
    console.log(email, password, password2);
    setAuthType('sign-in');
  };

  const signInForm = (
    <AuthForm
      headerText={'Hi Cinema Lover!'}
      type={authType}
      buttonText={'Sign in'}
      changeAuthForm={() => setAuthType('sign-up')}
      onButtonPress={(username, password) => signIn(username, password)}
    />
  );
  const signUpForm = (
    <AuthForm
      headerText={'Join us!'}
      type={authType}
      buttonText={'Sign up'}
      changeAuthForm={() => setAuthType('sign-in')}
      onButtonPress={(username, password, password2) =>
        signUp(username, password, password2)
      }
    />
  );

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/photo/cinema_auth2.png')}
        style={styles.image}
      />
      {authType === 'sign-in' ? signInForm : signUpForm}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default AuthScreen;
