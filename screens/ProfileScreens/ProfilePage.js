import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import firebase from '../../config/firebase'
import { clearLoginState } from '../../redux/action'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'; 
class Profile extends React.Component {
    render() {
        return (
            <>
             <Button
            buttonStyle={{borderRadius: 5, marginLeft: 5, marginRight: 5, marginBottom: 5}}
            title='Subscription' 
            onPress={e=>{
                this.props.navigation.navigate('SubPage')
               }}
            />
            <Button
                buttonStyle={{borderRadius: 5, marginLeft: 5, marginRight: 5, marginBottom: 5}}
                title='Logout' 
                onPress={e=>{
                    let self = this
                    firebase.auth().signOut().then(async ()=> {
                        await AsyncStorage.removeItem('userData')
                        self.props.clearLogin()
                        self.props.navigation.navigate('Login')
                    }, (error)=> {

                    })
                }}
            />
           
            </>
        )
    }
}
const styles = StyleSheet.create({
    Container: {
        display:'flex'
    }
})


const mapStateToProps = state => {
    return {
      user: state.loginReducer
    }
  }
 
const mapDispatchToProps = dispatch => ({
    clearLogin: login => dispatch(clearLoginState(login))
})
export default connect(mapStateToProps, mapDispatchToProps)(Profile)