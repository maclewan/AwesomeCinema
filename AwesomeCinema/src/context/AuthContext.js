import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';
import {navigate} from '../helpers/navigationRef';

import {BASE_URL} from '../constants';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const ERROR = 'ERROR';

// reducer, który obsługuje akcje związane z autoryzacją użytkownika
// state = { token, errMsg }
// token - token autoryzujący użytkownika
// username - nazwa użytkownika zwrócona przez server
// errMsg - zawiera treść błędu w razie jego wystąpienia
const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.payload.token,
        username: action.payload.username,
        errMsg: '',
      };
    case LOGOUT:
      return {token: null, username: '', errMsg: ''};
    case ERROR:
      return {...state, errMsg: action.payload};
    default:
      return state;
  }
};

// próba automatycznego logowania
// jeśli token istnieje w urządzeniu i jest on aktualny nastąpi zalogowanie
// w p.p. nastąpi przekierowanie do ekranu logowania
const tryLocalLogin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  const username = await AsyncStorage.getItem('username');
  if (token) {
    dispatch({type: LOGIN, payload: {token, username}});
    navigate('MovieList');
  } else {
    navigate('Auth');
  }
};

// obsługa logowania danymi 'username' oraz 'password'
const login = dispatch => async (username, password) => {
  await fetch(`${BASE_URL}/auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password, email: username}),
  })
    .then(response => response.json())
    .then(async response => {
      console.log('====================================');
      console.log(response);
      console.log('====================================');
      const token = response.key;
      // // zapisanie 'token' oraz 'username' w pamięci urządzenia
      // // aby umożliwić automatyczne logowanie
      await AsyncStorage.setItem('token', token);
      // await AsyncStorage.setItem('username', usrname);
      dispatch({type: LOGIN, payload: {token}});
      // po udanym logowaniu nawigacja do ekranu Dashboard
      navigate('MovieList');
    })
    .catch(error => {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      dispatch({
        type: ERROR,
        payload: error,
      });
    });
};
// obsługa logowania danymi 'username' oraz 'password'
const register = dispatch => async (email, password1, password2) => {
  console.log('dupa print');
  await fetch(`${BASE_URL}/auth/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username: email, password1, password2, email}),
  })
    .then(response => JSON.stringify(response))
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
      dispatch({
        type: ERROR,
        payload: error?.response?.data?.error,
      });
    });
};

const logout = dispatch => async () => {
  // usunięcie danych użytkownika z urządzenia
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('username');
  dispatch({type: LOGOUT});
  navigate('Auth');
};

// stworzenie i eksport Provider i Context dające dostęp do powyższych funkcji i danych
export const {Provider, Context} = createDataContext(
  authReducer,
  {tryLocalLogin, login, logout, register},
  {token: null, username: '', errMsg: ''},
);
