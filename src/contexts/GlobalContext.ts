import React from 'react';

const GlobalContext = React.createContext<AppContext>({
  setAuthenticated: () => {},
  setIsFirstTime: () => {},
  setUserPhone: () => {},
  setUseName: () => {},
  userPhone: '',
  isFirstTime: false,
  userName: '',
  vehicleId: '',
});

export default GlobalContext;
