import {useContext, useEffect} from 'react';
import {Context as AuthContext} from '../context/AuthContext';

// ekran, który wyświetla się pierwszy po uruchomieniu aplikacji
// jego zadaniem jest wywołanie fukcji automatycznego logowanie
const ResolveAuthScreen = () => {
  const {tryLocalLogin} = useContext(AuthContext);

  useEffect(() => {
    tryLocalLogin();
  }, []);

  return null;
};

export default ResolveAuthScreen;
