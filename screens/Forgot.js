import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, Alert } from 'react-native'
import firebase from '../config/firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { setLoginState } from '../redux/action'
class Login extends React.Component {
    state = {
        email: ''
    }
    handleLogin = () => {
        if(this.state.email != "") {
              firebase.auth().sendPasswordResetEmail(this.state.email)
              Alert.alert("Password Reset link has been sent to your mail address")
        }
    }
    render() {
        return (
            <View style={styles.container}>
                    <TextInput
                        style={styles.inputBox}
                        value={this.state.email}
                        onChangeText={email => this.setState({email})}
                        placeholder="Email"
                        autoCapitalize="none"
                   />
                   
                   <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                       <Text style={styles.buttonText}>
                           Forgot Password
                       </Text>
                   </TouchableOpacity>
                   <Button title="Don't have an Account Yet? Sign UP" onPress={e=>this.props.navigation.navigate("Signup")}/>
             </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#F6820D',
        borderColor: '#F6820D',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    buttonSignup: {
        fontSize: 12
    }
})

const mapStateToProps = state => {
    return {
      user: state.loginReducer
    }
  }
 
const mapDispatchToProps = dispatch => ({
    loginChange: login => dispatch(setLoginState(login))
})
export default connect(mapStateToProps, mapDispatchToProps)(Login)