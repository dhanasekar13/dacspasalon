import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native'
import Firebase from '../config/firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { setLoginState } from '../redux/action'
class Login extends React.Component {
    state = {
        email: '',
        password: ''
    }
    
    componentDidMount() {
        this.props.user.then(value=> {
            if(value.isLoggedIn){
                this.props.navigation.navigate('Home')
            }
          })
          .catch(()=>{
            console.log('eroor')
          })  
    }
    handleLogin = () => {
        const { email, password } = this.state
        Firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(({user}) =>{
                let userJson = {
                    userId: user.uid,
                    token: user.xa,
                    refreshToken: user.refreshToken,
                    expiresOn: new Date(user.tokensValidAfterTime).getTime() / 1000,
                    data: {
                        email: user.email,
                        phone: user.phoneNumber,
                        photo: user.photoURL
                    }
                }
                this.props.loginChange(userJson)
                this.props.navigation.navigate('Home')
            })
            .catch(error => console.log(error))
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
                    <TextInput
                        style={styles.inputBox}
                        value={this.state.password}
                        onChangeText={password => this.setState({password})}
                        placeholder="Password"
                        secureTextEntry={true}
                   />
                   <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                       <Text style={styles.buttonText}>
                           Login
                       </Text>
                   </TouchableOpacity>
                   <Button title="Don't have an Account Yet? Sign UP" type="clear" onPress={e=>this.props.navigation.navigate("Signup")}/>
                   <TouchableOpacity style={styles.buttonforgot} onPress={e=>this.props.navigation.navigate("Forgot")}>
                       <Text style={styles.buttonTextforgot}>
                       forgot your password
                       </Text>
                    </TouchableOpacity>
                  
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
    buttonforgot: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    buttonTextforgot: { 
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
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