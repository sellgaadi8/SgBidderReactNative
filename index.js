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
import PushNotification, {Importance} from 'react-native-push-notification';
import {NOTIFICATION_CHANNEL} from './src/utils/constant';
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

PushNotification.createChannel({
  channelId: NOTIFICATION_CHANNEL, // (required)
  channelName: 'Default Channel', // (required)
  channelDescription:
    'This is the default notification channel of Sellgadi Seller App', // (optional) default: undefined.
  playSound: true, // (optional) default: true
  soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
  importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
  vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.import { NOTIFICATION_CHANNEL } from './constants';
});

// PushNotification.configure({
//   // (optional) Called when Token is generated (iOS and Android)
//   onRegister: console.log,
//   // (required) Called when a remote is received or opened, or local notification is opened
//   onNotification: function (notification) {
//     // const { message, title, userInteraction, foreground, data } = notification;
//     const {click_to_action} = notification.data;

//     const clickToActionString = click_to_action;
//     const clickToAction = JSON.parse(clickToActionString);
//     if (notification.foreground) {
//     } else {
//       let route = 'ExploreStack';
//       let params = {};
//       switch (clickToAction.page) {
//         case 'details_page':
//           console.log('called');
//           route = 'VehicleDetail';
//           params.uui = clickToAction.id;
//           break;
//         case 'deal_won_page':
//           route = 'OrderStack';
//           params.uui = clickToAction.id;
//           break;
//       }
//       navigationRef?.current?.navigate(route, {
//         from: 'NOTIFICATIONS',
//         ...params,
//       });
//     }
//     PushNotification.removeAllDeliveredNotifications();
//   },
//   popInitialNotification: true,
// });

AppRegistry.registerComponent(appName, () => Main);

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log(remoteMessage, 'remoteMessageremoteMessage');
//   const {data} = remoteMessage;
//   if (data) {
//     const {body, title, click_to_action} = data;
//     store.dispatch(
//       onPushNotification({
//         body: body,
//         title: title,
//         click_to_action: click_to_action,
//       }),
//     );
//   }
// });

const styles = StyleSheet.create({
  container: {flex: 1},
});
