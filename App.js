import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login'
import Signup from './screens/Signup'
import Navigation from './Navigation'
import { Provider } from 'react-redux'
import configurestore from './redux/store'

export default function App() {
  return (
  <Provider store={configurestore}>
      <NavigationContainer>
          <Navigation />
      </NavigationContainer> 
  </Provider>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
