import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BookingPage from './BookingScreens/index'
import Profile from './ProfileScreens/index'
import HomeScreenIndex from './HomeScreens/index'
const Tab = createBottomTabNavigator()
class Home extends React.Component {
    render() {
        return (
            <Tab.Navigator>
              <Tab.Screen name="Home" component={HomeScreenIndex} options={{
                tabBarLabel: "Home",
                tabBarIcon: ({color,size}) => (
                  <MaterialCommunityIcons name="home" size={size}/>
                )
              }} />
              <Tab.Screen name="Booking" component={BookingPage}  options={{
                tabBarLabel: "Booking",
                tabBarIcon: ({color,size}) => (
                  <MaterialCommunityIcons name="book" size={size}/>
                )
              }}/>
              <Tab.Screen name="Profile" component={Profile}  options={{
                tabBarLabel: "Profile",
                tabBarIcon: ({color,size}) => (
                  <MaterialCommunityIcons name="face-profile" size={size}/>
                )
              }}/>
            </Tab.Navigator>
        )
    }
}

export default Home