import React from 'react'
import { View, Text, StyleSheet , ScrollView, Image} from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import firebase from '../../config/firebase'
import { connect } from 'react-redux'
class BookingPaid extends React.Component {
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
                if(listvalue[1].paid == 1){
                    booking[listvalue[0]] = listvalue[1]
                }
            })
            self.setState({
                bookinglist:booking
            })
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
                    listvalue[1].paid == 1 &&(
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
                                    console.log("paying for the product using square")
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
export default connect(mapStateToProps)(BookingPaid)