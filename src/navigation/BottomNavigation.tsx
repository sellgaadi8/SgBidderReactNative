/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../utils/colors';
import {contentCenter} from '../utils/styles';
import {useAppSelector} from '../utils/hook';
import TabLabel from '../components/TabLabel';
import ExploreStack from './stacks/ExploreStack';
import MyCarStack from './stacks/MyCarStack';
import OrderStack from './stacks/OrderStack';
import ProfileStack from './stacks/ProfileStack';

const Tab = createBottomTabNavigator<BottomStackParamList>();

export default function BottomNavigation() {
  const selectGlobalState = useAppSelector(state => state.global);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: '#EAEAEA',
          elevation: 4,
          shadowRadius: 5,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.8,
          borderWidth: 0.5,
          borderColor: '#CCCCCC',
          display: selectGlobalState.showBottomTabs ? 'flex' : 'none',
          position: 'absolute',
          height: 70,
        },
        unmountOnBlur: true,
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: ({focused}) => (
            <TabLabel focused={focused} value="Explore" />
          ),
          tabBarIcon: ({focused}) => (
            <View style={focused && styles.active}>
              <MaterialIcons
                name="explore"
                color={focused ? '#000000' : 'rgba(0, 0, 0, 0.5)'}
                size={25}
              />
            </View>
          ),
        }}
        name="ExploreStack"
        component={ExploreStack}
      />
      <Tab.Screen
        listeners={{
          tabPress: selectGlobalState.isFormEdited
            ? e => {
                if (selectGlobalState.isFormEdited) {
                  e.preventDefault();
                }
              }
            : undefined,
        }}
        options={{
          tabBarLabel: ({focused}) => (
            <TabLabel focused={focused} value="My Cars" />
          ),

          tabBarIcon: ({focused}) => (
            <View style={focused && styles.active}>
              <MaterialCommunityIcons
                name="car-outline"
                color={focused ? '#000000' : 'rgba(0, 0, 0, 0.5)'}
                size={25}
              />
            </View>
          ),
        }}
        name="MyCarStack"
        component={MyCarStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: ({focused}) => (
            <TabLabel focused={focused} value="Orders" />
          ),
          tabBarIcon: ({focused}) => (
            <View style={focused && styles.active}>
              <MaterialCommunityIcons
                name="card-bulleted-outline"
                color={focused ? '#000000' : 'rgba(0, 0, 0, 0.5)'}
                size={25}
              />
            </View>
          ),
        }}
        name="OrderStack"
        component={OrderStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: ({focused}) => (
            <TabLabel focused={focused} value="Profile" />
          ),
          tabBarIcon: ({focused}) => (
            <View style={focused && styles.active}>
              <Ionicons
                name="person"
                color={focused ? '#000000' : 'rgba(0, 0, 0, 0.5)'}
                size={20}
              />
            </View>
          ),
        }}
        name="ProfileStack"
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
}

const styles = EStyleSheet.create({
  active: {
    backgroundColor: colors.secondary,
    padding: '0.5rem',
    borderRadius: '2rem',
    width: 60,
    ...contentCenter,
  },
});
