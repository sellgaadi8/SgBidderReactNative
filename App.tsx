import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import CreatePassword from './src/views/Auth/CreatePassword';
import Login from './src/views/Auth/Login';
import Register from './src/views/Auth/Register';

export default function App() {
  const RootStack = createStackNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <RootStack.Navigator>
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
            component={CreatePassword}
            name="CreatePassword"
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', position: 'relative'},
});
