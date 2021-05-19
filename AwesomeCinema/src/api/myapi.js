import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const myAPI = axios.create({
  baseUrl: 'https://api.gn2.dev/core/workers',
});

// myAPI.interceptors.request.use(async config => {
//   const token = AsyncStorage.getItem('token');
//   config.headers.Authorization = token ? `Token ${token}` : '';
//   return config;
// });

export default myAPI;
