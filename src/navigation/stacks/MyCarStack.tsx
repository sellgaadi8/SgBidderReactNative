import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Mycar from '../../views/Mycar/Mycar';

const MyCarStackNavigation = createStackNavigator();

export default function MyCarStack() {
  return (
    <MyCarStackNavigation.Navigator>
      <MyCarStackNavigation.Screen component={Mycar} name="My cars" />
    </MyCarStackNavigation.Navigator>
  );
}
