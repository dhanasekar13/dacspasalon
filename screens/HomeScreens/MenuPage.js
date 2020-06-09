import React from 'react';
import { View, Text, Image,  ScrollView  } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import firebase from '../../config/firebase'
import { TabActions } from '@react-navigation/native';
export default function MediaControlCard(props) {
   const getImage=async (image) =>{
    let ref = firebase.storage().ref(image)
    let reference = await ref.getDownloadURL()
    return reference
   // return reference
    // storage.child(image).getDownloadURL().then((url) => {
    //   return url
    // }).catch((error) => {
    //   // Handle any errors
    // })
  }
  const homeScreenMenu = [
    {
      image:"gs://dachspasalon.appspot.com/unnamed.jpg",
      title:"Service",
      text:"Wedding Party And Special Occasion",
      pushto: "ServicePage"
    },
    {
      image:"",
      title:"Product",
      text:"100% Natural & Hand Made Products",
      pushto: "ProductPage"
    },
    {
      image:"",
      title:"Gallery",
      pushto: "GalleryPage"
    }
  ]
  return (
    < ScrollView  >
   {
      homeScreenMenu.map((menuItems, index)=>(
        <Card
            title={menuItems.title}
            image={getImage(menuItems.image)} key={index}>
            <Text style={{marginBottom: 10}}>
                {menuItems.text}      
            </Text>
            <Button
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='Explore Now' 
                onPress={e=>{
                    props.navigation.navigate(menuItems.pushto)
                }}
            />
        </Card>
  ))
      }
      </ScrollView>
  )
}
