import React, {useState, useEffect} from 'react'
import Login from './screens/Login'
import Signup from './screens/Signup'
import Home from './screens/Home'
import Forgot from './screens/Forgot'
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux'
const Stack = createStackNavigator()
class SwitchNavigator extends React.Component {
  constructor(props){
    super(props)
  }
  state = {
    initialScreen: "Login"
  }
  
  componentDidMount() {
    this.props.user.then(value=> {
        if(value.isLoggedIn){
            this.props.navigation.replace('Home')
        }
      })
      .catch(()=>{
        console.log('eroor')
      })  
}

  render() {
    return (
      <Stack.Navigator initialRouteName={this.state.intialScreen} screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} options={{ headerTitle:"Dach Spa Salon", headerLeft:null}} />
        <Stack.Screen name="Forgot" component={Forgot} options={{ headerTitle:"Reset Password", headerLeft:null}} />
      </Stack.Navigator>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.loginReducer
  }
}
 
export default connect(mapStateToProps)(SwitchNavigator)