import React from 'react'
import { View, Text, StyleSheet , ScrollView, Image, SafeAreaView, Alert} from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import firebase from '../../config/firebase'
import { connect } from 'react-redux'

class ProductPage extends React.Component {
    state = {
        productlist: []
    }
    componentDidMount () {
        let database = firebase.database().ref().child('product')
        let self = this
        database.on("value", function(snapshot) {
            self.setState({
                productlist: snapshot.val()
            })
          }, function (error) {
            console.log("Error: " + error.code);
         });
    }
    confirmBuying = (details, index) =>
    Alert.alert(
      "Are you Sure want to Buy",
      `${details.name}`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => this.enteryInvoice(details, index) }
      ],
      { cancelable: false }
    );

    enteryInvoice = (details, index) => {
        const dbRef = firebase.database().ref();
        const invoiceRef = dbRef.child('invoice');
        this.props.user.then((value)=>{
            let jsonValue = {
                productId: index,
                userId: value.userId,
                paid: 0,
                price:details.price,
                name:details.name,
                image:details.image
            }
            invoiceRef.push(jsonValue, function () {
                 Alert.alert(
                    "Selected Product has been Added",
                    "To Booking",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                      { text: "OK", onPress: () => console.log("Saved the Booking")}
                    ],
                    { cancelable: false }
                  );
            })
        })
    }
    render() {
        return (
            <SafeAreaView>
            <ScrollView>
            {               
                this.state.productlist.map((menuItems, index)=> (
                        <Card
                            title={menuItems.name}
                            key={index}>
                            {menuItems.image && 
                                <Image
                                    style={{height:150}}
                                    resizeMode="cover"
                                    source={{ uri: menuItems.image}}
                                />
                            }
                            <Text style={{marginBottom: 10}}>
                               $ {menuItems.price}      
                            </Text>
                            <Button
                                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                title='Buy Now' 
                                onPress={e=>{
                                    this.confirmBuying(menuItems, index)
                                }}
                            />
                        </Card>
                    ))
            }
        </ScrollView>
        </SafeAreaView>
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
export default connect(mapStateToProps)(ProductPage)