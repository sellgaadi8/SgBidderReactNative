/**
 * @format
 */

import 'react-native-gesture-handler';

import {AppRegistry, Dimensions, StyleSheet} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import store from './src/redux/store';
import React from 'react';
import {Provider} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
const {width} = Dimensions.get('screen');

EStyleSheet.build({
  $rem: width > 480 ? 16 : 10,
});

function Main() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.container}>
        <App />
      </GestureHandlerRootView>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);

const styles = StyleSheet.create({
  container: {flex: 1},
});
