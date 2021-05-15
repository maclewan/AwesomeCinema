import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Input, Icon} from 'react-native-elements';

const AuthForm = ({
  headerText,
  type,
  buttonText,
  onButtonPress,
  changeAuthForm,
}) => {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{headerText}</Text>
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        inputStyle={styles.input}
        leftIcon={{
          type: 'MaterialIcons',
          name: 'email',
          color: '#777',
          size: 25,
        }}
      />
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        value={password1}
        onChangeText={setPassword1}
        placeholder="Password"
        inputStyle={styles.input}
        leftIcon={{
          type: 'MaterialCommunityIcons',
          name: 'lock',
          color: '#777',
          size: 25,
        }}
        secureTextEntry={true}
      />
      {type === 'sign-up' ? (
        <Input
          autoCapitalize="none"
          autoCorrect={false}
          value={password2}
          onChangeText={setPassword2}
          placeholder="Repeat password"
          inputStyle={styles.input}
          leftIcon={{
            type: 'MaterialCommunityIcons',
            name: 'lock',
            color: '#777',
            size: 25,
          }}
          secureTextEntry={true}
        />
      ) : null}
      <TouchableOpacity
        style={styles.buttonSubmit}
        onPress={() => onButtonPress(email, password1, password2)}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonChangeAuthForm}
        onPress={changeAuthForm}>
        <Text style={styles.buttonChangeAuthFormText}>
          {type === 'sign-up' ? 'Mam już konto!' : 'Nie posiadam konta :('}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {fontSize: 25},
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 30,
  },
  buttonSubmit: {},
  buttonSubmitText: {},
});

export default AuthForm;
