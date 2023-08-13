import React from 'react';

const GlobalContext = React.createContext<AppContext>({
  setAuthenticated: () => {},
  setIsFirstTime: () => {},
  setUserPhone: () => {},
  userPhone: '',
});

export default GlobalContext;
