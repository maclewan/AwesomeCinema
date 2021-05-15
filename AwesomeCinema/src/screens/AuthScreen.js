import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';

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
      headerText={'Sign in'}
      type={authType}
      buttonText={'Sign in'}
      changeAuthForm={() => setAuthType('sign-up')}
      onButtonPress={(username, password) => signIn(username, password)}
    />
  );
  const signUpForm = (
    <AuthForm
      headerText={'Sign up'}
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
      {authType === 'sign-in' ? signInForm : signUpForm}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthScreen;
