/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../../views/Profile/Profile';
import Header from '../../components/Header';

const ProfileStackNavigation = createStackNavigator();

export default function ProfileStack() {
  return (
    <ProfileStackNavigation.Navigator>
      <ProfileStackNavigation.Screen
        component={Profile}
        name="Profile"
        options={() => {
          return {
            header: props => <Header title="Profile" headerProps={props} />,
          };
        }}
      />
    </ProfileStackNavigation.Navigator>
  );
}
