// pllik zawierający funkcje, które służą za przetrzymanie obiektu nawigacji
// eksporotwanie tego obiektu do Componentów nadrzędnych np. providerów

import { NavigationActions } from "react-navigation";

let navigator;

// otrzymanie navigatora i zapisanie go w pliku
export const navigationRef = (nav) => (navigator = nav);


// nawigacja do podanego 'routeName' z podanymi danymi 'params'
export const navigate = (routeName, params) => {
  navigator.dispatch(NavigationActions.navigate({ routeName, params }));
};