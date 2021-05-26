// pllik zawierający funkcje, które służą za przetrzymanie obiektu nawigacji
// eksporotwanie tego obiektu do Componentów nadrzędnych np. providerów

import * as React from 'react';

// otrzymanie navigatora i zapisanie go w pliku
export const navigationRef = React.createRef();

// nawigacja do podanego 'routeName' z podanymi danymi 'params'
export const navigate = (routeName, params) => {
  navigationRef.current?.navigate(routeName, params);
};
