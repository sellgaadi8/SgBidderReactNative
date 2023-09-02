type AppContext = {
  setAuthenticated: (value: boolean) => void;
  setIsFirstTime: (value: boolean) => void;
  setUserPhone: (value: string) => void;
  userPhone: string;
  isFirstTime: boolean;
};
