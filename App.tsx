import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import CreatePassword from './src/views/Auth/CreatePassword';
import Login from './src/views/Auth/Login';
import Register from './src/views/Auth/Register';
import ForgotPassword from './src/views/Auth/ForgotPassword';
import GlobalContext from './src/contexts/GlobalContext';
import BottomNavigation from './src/navigation/BottomNavigation';

export default function App() {
  const RootStack = createStackNavigator();
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        setAuthenticated,
      }}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <RootStack.Navigator>
            {!authenticated ? (
              <>
                <RootStack.Screen
                  options={{headerShown: false}}
                  component={Login}
                  name="Login"
                />
                <RootStack.Screen
                  options={{headerShown: false}}
                  component={Register}
                  name="Register"
                />
                <RootStack.Screen
                  options={{headerShown: false}}
                  component={ForgotPassword}
                  name="ForgotPassword"
                />
                <RootStack.Screen
                  options={{headerShown: false}}
                  component={CreatePassword}
                  name="CreatePassword"
                />
              </>
            ) : (
              <>
                <RootStack.Screen
                  options={{headerShown: false}}
                  component={BottomNavigation}
                  name="BottomNavigation"
                />
                {/* <RootStack.Screen
                  options={{headerShown: false}}
                  component={Welcome}
                  name="Welcome"
                /> */}
              </>
            )}
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </GlobalContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', position: 'relative'},
});
