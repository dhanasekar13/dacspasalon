import React from 'react'
import MenuPage from './MenuPage';
import Serivcepage from './ServicePage'
import ProductPage from './ProductPage'
import GalleryPage from './GalleryPage'
import { createStackNavigator } from '@react-navigation/stack';
const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="Menu" screenOptions={{Headers:null,  headerTitle:"Dach Spa Salon"}}>
      <HomeStack.Screen name="Menu" component={MenuPage} />
      <HomeStack.Screen name="ServicePage" component={Serivcepage} />
      <HomeStack.Screen name="ProductPage" component={ProductPage} />
      <HomeStack.Screen name="GalleryPage" component={GalleryPage} />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen