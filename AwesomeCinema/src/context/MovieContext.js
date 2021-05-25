import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';
import myapi from '../api/myapi';
import {navigate} from '../helpers/navigationRef';

import {BASE_URL} from '../constants';

const GET_MOVIES = 'GET MOVIES';
const GET_SCREENINGS = 'GET SCREENINGS DATA';
const GET_SCREENING = 'GET ONE SCREENING DATA';
const GET_FREE_TICKETS = 'GET FREE TICKETS';
const GET_HALL = 'GET ONE HALL DATA';
const ERROR = 'ERROR';

// reducer obsługujący akcje związane z filmami
const movieReducer = (state, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return {...state, movies: action.payload.movies};
    case GET_SCREENINGS:
      return {...state, screenings: action.payload.screenings};
    case GET_SCREENING:
      return {...state, currScreening: action.payload.currScreening};
    case GET_FREE_TICKETS:
      return {...state, freeTickets: action.payload.freeTickets};
    case GET_HALL:
      return {...state, currHall: action.payload.currHall};
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
      const screenings = response.screenings;
      dispatch({type: GET_SCREENINGS, payload: {screenings}});
    })
    .catch(error => {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      dispatch({type: ERROR, payload: error});
    });
};

const getScreening = dispatch => async screeningId => {
  const token = await AsyncStorage.getItem('token');
  await fetch(`${BASE_URL}/cinema/screenings/${screeningId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
    .then(response => response.json())
    .then(response => {
      const currScreening = response.screening;
      dispatch({type: GET_SCREENING, payload: {currScreening}});
    })
    .catch(error => {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      dispatch({type: ERROR, payload: error});
    });
};

const getHall = dispatch => async hallId => {
  const token = await AsyncStorage.getItem('token');
  await fetch(`${BASE_URL}/cinema/halls/${hallId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
    .then(response => response.json())
    .then(response => {
      const currHall = response.hall;
      dispatch({type: GET_HALL, payload: {currHall}});
    })
    .catch(error => {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      dispatch({type: ERROR, payload: error});
    });
};

const getFreeTickets = dispatch => async screeningId => {
  const token = await AsyncStorage.getItem('token');
  await fetch(`${BASE_URL}/cinema/tickets/${screeningId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
    .then(response => response.json())
    .then(response => {
      const freeTickets = response.tickets;
      dispatch({type: GET_FREE_TICKETS, payload: {freeTickets}});
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
  {getMovies, getScreenings, bookTicket, getScreening, getHall, getFreeTickets},
  {
    movies: [],
    screenings: [],
    currScreening: null,
    currHall: null,
    freeTickets: [],
  },
);
