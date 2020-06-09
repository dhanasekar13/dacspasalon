import React from 'react'
import ProfilePage from './ProfilePage'
import SubscriptionPage from './SubscriptionPage'
import { createStackNavigator } from '@react-navigation/stack';
const HomeStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="ProfilePage" screenOptions={{Headers:null,  headerTitle:"My Profile"}}>
      <HomeStack.Screen name="ProfilePage" component={ProfilePage} />
      <HomeStack.Screen name="SubPage" component={SubscriptionPage} />
    </HomeStack.Navigator>
  );
}

export default ProfileStackScreen