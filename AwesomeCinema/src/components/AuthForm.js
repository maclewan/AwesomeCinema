import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
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
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}
  >
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
        <Text style={styles.buttonSubmitText}>{buttonText}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonChangeAuthForm}
        onPress={changeAuthForm}>
        <Text style={styles.buttonChangeAuthFormText}>
          {type === 'sign-up' ? 'Mam już konto!' : 'Nie posiadam konta :('}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '80%',
  },
  headerText: {fontSize: 25, color: '#000', marginBottom: 10,},
  input: {
    paddingLeft: 10,
  },
  buttonSubmit: {
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: '#ff2f00',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginBottom: 10,
  },
  buttonSubmitText: {
    color: '#fff',
    fontSize: 25,
  },
  buttonChangeAuthFormText: {
    fontSize: 16,
    color: '#444',
  }
});

export default AuthForm;
