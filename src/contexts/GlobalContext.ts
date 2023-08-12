import React from 'react';

const GlobalContext = React.createContext<AppContext>({
  setAuthenticated: () => {},
});

export default GlobalContext;
