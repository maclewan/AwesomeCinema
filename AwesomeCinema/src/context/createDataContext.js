import React, { useReducer } from "react";

// szablon do tworzenia Providerów
// reducer - obsługuje działanie funkcji dodanych do actions
// actions - funkcje obsługujące dane dostarczane przez context
// defaultValue - stan początkowy danych w tworzonym providerze
export default (reducer, actions, defaultValue) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    // do zmiany stanu przez funkcje w providerze potrzebujemy funkcji dispatch
    // jest ona tworzona tutaj ( w nadrzędnym komponencie )
    // dlatego przekazujemy im ją jako parametr
    const dumpedActions = {};
    for (let key in actions) {
      dumpedActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...dumpedActions }}>
        {children}
      </Context.Provider>
    );
  };

  // Context zawierający dane
  // Provider umożliwiający dostęp do Contextu
  return { Context, Provider };
};