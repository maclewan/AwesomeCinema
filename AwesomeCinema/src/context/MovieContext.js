import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';
import myapi from '../api/myapi';
import {navigate} from '../helpers/navigationRef';

const GET_MOVIES = 'GET MOVIES';
const GET_ROOM = 'GET ROOM DATA';
const ERROR = 'ERROR';

// reducer obsługujący akcje związane z filmami
const movieReducer = (state, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return {...state, movies: action.payload.movies};
    case GET_ROOM:
      return {...state, roomData: action.payload.roomData};
    case ERROR:
      return {...state, errMsg: action.payload};
    default:
      return state;
  }
};

const getMovies = dispatch => async () => {
  await myapi
    .get('url')
    .then(response => {})
    .catch(err => {});
};

const getRoomData = dispatch => async () => {
  await myapi
    .get('url')
    .then(response => {})
    .catch(err => {});
};

const bookTicket = dispatch => async () => {
  await myapi
    .post('url', {data})
    .then(response => {})
    .catch(err => {});
};

// stworzenie i eksport Provider i Context dające dostęp do powyższych funkcji i danych
export const {Provider, Context} = createDataContext(
  movieReducer,
  {getMovies, getRoomData, bookTicket},
  {movies: [], roomData: []},
);
