import React from 'react'
import { View, Text, StyleSheet , ScrollView, Image} from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import firebase from '../../config/firebase'
class ServicePage extends React.Component {
    state = {
        servicelist: {}
    }
    componentDidMount () {
        let database = firebase.database().ref().child('service')
        let self = this
        database.on("value", function(snapshot) {
            self.setState({
                servicelist: snapshot.val()
            })
          }, function (error) {
            console.log("Error: " + error.code);
         });
    }
    render() {
        return (
            <ScrollView>
            {               
                Object.entries(this.state.servicelist).map((listvalue)=> listvalue[1].map((menuItems, index)=> (
                        <Card
                            title={listvalue[0]}
                            key={index}>
                            <Text style={{marginBottom: 10}}>
                                {menuItems.name}      
                            </Text>
                            {menuItems.image && 
                                <Image
                                    style={{height:150}}
                                    resizeMode="cover"
                                    source={{ uri: menuItems.image}}
                                />
                            }
                            <Text style={{marginBottom: 10}}>
                                {menuItems.price}      
                            </Text>
                        </Card>
                    ))
                )
            }
        </ScrollView>
        )}
}
const styles = StyleSheet.create({
    Container: {
        display:'flex'
    }
})

export default ServicePage