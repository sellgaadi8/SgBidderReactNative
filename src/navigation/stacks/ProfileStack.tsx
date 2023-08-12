import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../../views/Profile/Profile';

const ProfileStackNavigation = createStackNavigator();

export default function ProfileStack() {
  return (
    <ProfileStackNavigation.Navigator>
      <ProfileStackNavigation.Screen component={Profile} name="Profile" />
    </ProfileStackNavigation.Navigator>
  );
}
