import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Orders from '../../views/Orders/Orders';

const OrderStackNavigation = createStackNavigator();

export default function OrderStack() {
  return (
    <OrderStackNavigation.Navigator>
      <OrderStackNavigation.Screen component={Orders} name="Orders" />
    </OrderStackNavigation.Navigator>
  );
}
