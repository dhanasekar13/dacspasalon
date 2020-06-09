import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

class GalleryPage extends React.Component {
    render() {
        return (
            <View style={styles.Container }>
                <Text>This is the Gallery Page</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    Container: {
        display:'flex'
    }
})

export default GalleryPage