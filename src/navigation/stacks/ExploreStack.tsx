import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Explore from '../../views/Explore/Explore';

const ExploreStackNavigation = createStackNavigator();

export default function ExploreStack() {
  return (
    <ExploreStackNavigation.Navigator>
      <ExploreStackNavigation.Screen
        component={Explore}
        name="Explore"
        options={{headerShown: false}}
      />
    </ExploreStackNavigation.Navigator>
  );
}
