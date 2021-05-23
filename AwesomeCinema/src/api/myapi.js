import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const myAPI = axios.create({
  baseUrl: 'http://10.0.2.2/',
});

// myAPI.interceptors.request.use(async config => {
//   const token = AsyncStorage.getItem('token');
//   config.headers.Authorization = token ? `Token ${token}` : '';
//   return config;
// });

export default myAPI;
