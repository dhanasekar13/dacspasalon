import React from 'react'
import { View, Text, StyleSheet , ScrollView, Image} from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import firebase from '../../config/firebase'
import { connect } from 'react-redux'
class BookingPage extends React.Component {
    state = {
        bookinglist: [
            {
                name: "My Booking",
                navto: "BookingMenu"
            },
            {
                name: "Paid Booking",
                navto: "BookingPaid"
            }
        ]
    }
    render() {
        return (
            <ScrollView>
            {  
               this.state.bookinglist.map((listvalue, index)=>  (
                        <Card
                            title={listvalue.name}
                            key={index}>
                            <Button
                                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                title='Explore More' 
                                onPress={e=>{
                                    this.props.navigation.navigate(listvalue.navto)
                                }}
                            />
                        </Card>
                    ))
                    
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