import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MovieListScreen from './screens/MovieListScreen';
import AddMovieScreen from './screens/AddMovieScreen';
import EditMovieScreen from './screens/EditMovieScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MovieListScreen">
        <Stack.Screen name="MovieListScreen" component={MovieListScreen} />
        <Stack.Screen name="AddMovieScreen" component={AddMovieScreen} />
        <Stack.Screen name="EditMovieScreen" component={EditMovieScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
