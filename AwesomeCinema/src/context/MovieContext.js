import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';
import myapi from '../api/myapi';
import {navigate} from '../helpers/navigationRef';

import {BASE_URL} from '../constants';

const GET_MOVIES = 'GET MOVIES';
const GET_SCREENINGS = 'GET SCREENINGS DATA';
const ERROR = 'ERROR';

// reducer obsługujący akcje związane z filmami
const movieReducer = (state, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return {...state, movies: action.payload.movies};
    case GET_SCREENINGS:
      return {...state, screenings: action.payload.screenings};
    case ERROR:
      return {...state, errMsg: action.payload};
    default:
      return state;
  }
};

const getMovies = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  await fetch(`${BASE_URL}/cinema/movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
    .then(response => response.json())
    .then(response => {
      console.log('====================================');
      console.log(response);
      console.log('====================================');
      const movies = response.movies;
      dispatch({type: GET_MOVIES, payload: {movies}});
    })
    .catch(error => {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      dispatch({type: ERROR, payload: error});
    });
};

const getScreenings = dispatch => async movieId => {
  const token = await AsyncStorage.getItem('token');
  await fetch(`${BASE_URL}/cinema/screenings/?movie_id=${movieId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
    .then(response => response.json())
    .then(response => {
      console.log('====================================');
      console.log(response);
      console.log('====================================');
      const screenings = response.screenings;
      console.log('====================================');
      console.log(screenings);
      console.log('====================================');
      dispatch({type: GET_SCREENINGS, payload: {screenings}});
    })
    .catch(error => {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      dispatch({type: ERROR, payload: error});
    });
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
  {getMovies, getScreenings, bookTicket},
  {movies: [], screenings: []},
);
