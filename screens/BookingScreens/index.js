import React from 'react'
import BookingPage from './BookingPage'
import BookingPaid from './BookingPaid'
import Booking from './Booking'
import { createStackNavigator } from '@react-navigation/stack';
const HomeStack = createStackNavigator();

function BookingStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="BookingNav" screenOptions={{Headers:null,  headerTitle:"My Booking"}}>
      <HomeStack.Screen name="BookingMenu" component={BookingPage} />
      <HomeStack.Screen name="BookingPaid" component={BookingPaid} />
      <HomeStack.Screen name="BookingNav" component={Booking} />
    </HomeStack.Navigator>
  );
}

export default BookingStackScreen