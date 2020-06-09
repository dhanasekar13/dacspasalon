import React from 'react'
import { View, Text, StyleSheet , ScrollView, Image, Alert} from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import firebase from '../../config/firebase'
import { connect } from 'react-redux'
class BookingPage extends React.Component {
    state = {
        bookinglist: {}
    }
    componentDidMount () {
        let database = firebase.database().ref().child('invoice')
        let self = this
        self.props.user.then((uservalue)=> {
        database.orderByChild('userId').equalTo(uservalue.userId).on("value", function(snapshot) {
            let booking = {}
            Object.entries(snapshot.val()).map((listvalue, index) => {
                if(listvalue[1].paid == 0){
                    booking[listvalue[0]] = listvalue[1]
                }
            })
            // if(snapshot.val()){
                        self.setState({
                        bookinglist:booking
                    })
            //     }
             })
          }, function (error) {
            console.log("Error: " + error.code);
         });
         
    }
    render() {
        return (
            <ScrollView>
            {   JSON.stringify(this.state.bookinglist) != "{}"  ?            
                Object.entries(this.state.bookinglist).map((listvalue, index)=>  
                    listvalue[1].paid == 0 &&(
                        <Card
                            title={listvalue[1].name}
                            key={index}>
                            <Text style={{marginBottom: 10}}>
                                {listvalue[1].name}      
                            </Text>
                            {listvalue[1].image && 
                                <Image
                                    style={{height:150}}
                                    resizeMode="cover"
                                    source={{ uri: listvalue[1].image}}
                                />
                            }
                            <Text style={{marginBottom: 10}}>
                                {listvalue[1].price}      
                            </Text>
                            <Button
                                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                title='Pay Now' 
                                onPress={e=>{
                                    Alert.alert(
                                        "Are you Sure want to Cash on Delivery",
                                        `${listvalue[1].name}`,
                                        [
                                          {
                                            text: "Cancel",
                                            onPress: () => console.log("Cancel Pressed"),
                                            style: "cancel"
                                          },
                                          { text: "OK", onPress: () => {
                                            let database = firebase.database()
                                            database.ref("invoice/"+listvalue[0]).update({ paid: 1 });
                                            Alert.alert("Data are updated")
                                          }
                                        }
                                        ],
                                        { cancelable: false }
                                      );
                                }}
                            />
                        </Card>
                    ))
                    :
                    <Card
                    title="No Product Booked"
                    >
                    <Text style={{marginBottom: 10}}>
                       No Product Booked    
                    </Text>
                </Card>
            }
        </ScrollView>
        )}
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
export default connect(mapStateToProps)(BookingPage)