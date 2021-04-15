import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';


export class Music extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Music Screen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b3dbff',
    }
});

export default Music;
