/* eslint-disable react/no-unstable-nested-components */
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import CreatePassword from './src/views/Auth/CreatePassword';
import Login from './src/views/Auth/Login';
import Register from './src/views/Auth/Register';
import ForgotPassword from './src/views/Auth/ForgotPassword';
import GlobalContext from './src/contexts/GlobalContext';
import BottomNavigation from './src/navigation/BottomNavigation';
import VehicleDetail from './src/views/Explore/VehicleDetail';
import EditProfile from './src/views/Profile/EditProfile';
import Splash from './src/views/Splash/Splash';
import {useAppSelector} from './src/utils/hook';
import {deleteUserToken} from './src/utils/localStorage';
import Snackbar from 'react-native-snackbar';
import Header from './src/components/Header';
import OrderChart from './src/views/Orders/OrderChart';
import DealLost from './src/views/Orders/DealLost';
import ImageViewerCarousel from './src/views/Explore/ImageViewerCarousel';
import SuccessPage from './src/views/Explore/SuccessPage';
import messaging from '@react-native-firebase/messaging';
import ImageSection from './src/views/Explore/ImageSection';
import Notification from './src/views/Notification/Notification';
import {PermissionsAndroid} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {navigationRef} from './src/navigation/navigate';

export default function App() {
  const RootStack = createStackNavigator();
  const [authenticated, setAuthenticated] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const [userName, setUseName] = useState('');
  const [vehicleId, setVehicleId] = useState('');
  const selectLogoutState = useAppSelector(state => state.logout);

  useEffect(() => {
    PushNotification.configure({
      onNotification: function (notification) {
        const {click_to_action} = notification.data;
        const clickToActionString = click_to_action;
        const clickToAction = JSON.parse(clickToActionString);

        if (notification.foreground) {
          // Handle notification when app is in foreground
        } else {
          if (clickToAction) {
            let route: keyof RootStackParamList = 'ExploreStack';
            let params: any = {};

            switch (clickToAction.page) {
              case 'details_page':
                route = 'VehicleDetail';
                params.uuid = clickToAction.id;
                setVehicleId(clickToAction.id);

                break;
              case 'deal_won_page':
                route = 'OrderStack';
                params.uuid = clickToAction.id;
                params.activeindex = 1;
                break;
              case 'in_negotiation_page':
                route = 'OrderStack';
                params.uuid = clickToAction.id;
                break;
              case 'explore_page':
                route = 'ExploreStack';
                params.uuid = clickToAction.id;
                break;
            }
            navigationRef.current?.navigate(route, {
              from: 'NOTIFICATIONS',
              ...params,
            });
          }
        }
        PushNotification.removeAllDeliveredNotifications();
      },
      popInitialNotification: true,
    });
  }, []);

  useEffect(() => {
    async function requestNotificationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: 'Notification Permission',
            message: 'Your app needs permission to send notifications.',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission granted');
        } else {
          console.log('Notification permission denied');
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    }

    requestNotificationPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Handle the incoming message here
      console.log('remoteForegrounMsg', remoteMessage);
    });

    return unsubscribe;
  }, []);

  const getFirebaseToken = async () => {
    const token = await messaging().getToken();
    console.log('token=>>>>>', token);
  };

  useEffect(() => {
    getFirebaseToken();
  }, []);

  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  }, []);

  useEffect(() => {
    if (selectLogoutState.called) {
      const {error, message} = selectLogoutState;
      if (!error && message) {
        Snackbar.show({
          text: message,
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
        setAuthenticated(false);
      } else {
        deleteUserToken();
        setAuthenticated(false);
      }
    }
  }, [selectLogoutState]);

  return (
    <GlobalContext.Provider
      value={{
        setAuthenticated,
        setIsFirstTime,
        setUserPhone,
        userPhone,
        isFirstTime,
        userName,
        setUseName,
        vehicleId,
      }}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer ref={navigationRef}>
          <RootStack.Navigator>
            {!authenticated ? (
              <>
                <RootStack.Screen
                  options={{headerShown: false}}
                  component={Splash}
                  name="Splash"
                />
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
                <RootStack.Screen
                  options={(param: {
                    route: RouteProp<any, any>;
                    navigation: any;
                  }) => {
                    return {
                      header: props => (
                        <Header
                          title={param.route.params?.title}
                          headerProps={props}
                          back
                        />
                      ),
                    };
                  }}
                  component={VehicleDetail}
                  name="VehicleDetail"
                />
                <RootStack.Screen
                  options={() => {
                    return {
                      header: props => (
                        <Header
                          title="Update Profile"
                          headerProps={props}
                          back={isFirstTime ? false : true}
                        />
                      ),
                    };
                  }}
                  component={EditProfile}
                  name="EditProfile"
                />
                <RootStack.Screen
                  options={() => {
                    return {
                      header: props => (
                        <Header title="Car Status" headerProps={props} back />
                      ),
                    };
                  }}
                  component={OrderChart}
                  name="OrderChart"
                />
                <RootStack.Screen
                  options={() => {
                    return {
                      header: props => (
                        <Header title="Deals lost" headerProps={props} back />
                      ),
                    };
                  }}
                  component={DealLost}
                  name="DealLost"
                />
                <RootStack.Screen
                  options={{headerShown: false}}
                  component={ImageSection}
                  name="ImageSection"
                />
                <RootStack.Screen
                  options={() => {
                    return {
                      header: props => (
                        <Header title="Images" headerProps={props} back />
                      ),
                    };
                  }}
                  component={ImageViewerCarousel}
                  name="ImageViewerCarousel"
                />
                <RootStack.Screen
                  options={() => {
                    return {
                      header: props => (
                        <Header
                          title="Notifications"
                          headerProps={props}
                          back
                        />
                      ),
                    };
                  }}
                  component={Notification}
                  name="Notification"
                />
                <RootStack.Screen
                  options={{headerShown: false}}
                  component={SuccessPage}
                  name="SuccessPage"
                />
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
