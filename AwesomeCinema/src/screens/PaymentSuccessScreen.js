import React from 'react';
import {Text, View, Pressable} from 'react-native';

const PaymentSuccessScreen = ({navigation}) => (
  <View>
    <Text>PaymentSuccessScreen</Text>
    <Pressable onPress={() => navigation.navigate('Auth')}>
      <Text>Logout</Text>
    </Pressable>
  </View>
);

export default PaymentSuccessScreen;
