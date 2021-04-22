import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export class Music extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_weather: '',
            music_list: '',
            screenHeight: 0,
        }
    }

    onContentSizeChange = (contentWidth, contentHeight) =>{
        this.setState({screenHeight: contentHeight});
    }

    getMusicList = (weather) =>{
        const music_lists = require("../../assets/songWeather.json");
        // this.setState({music_list: music_lists["Sunny"]})
        this.setState({music_list: music_lists[weather]})
    }
    
    render() {
        
        var music_list_display = [];
        for(var i in this.state.music_list){
            var text = (
            <View key={i} style={styles.list_item}>
                <Text
                    // onPress={this.show.bind(this, this.props.music_list_display[i])}
                    numberOfLines={1}
                    style={styles.list_item_font}>
                    {this.state.music_list[i]}
                </Text>
            </View>
            );
            music_list_display.push(text);
        }

        const scrollEnabled = this.state.screenHeight > height;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView 
                    style={{ flex: 1 }}
                    contentContainerStyle={styles.scrollview}
                    scrollEnabled={scrollEnabled}
                    onContentSizeChange={this.onContentSizeChange}
                >
                    <Text>Music Screen for weather: {this.props.searchTerm}</Text>

                    <TouchableOpacity style={styles.searchMusicButton}
                        onPress={() => {this.getMusicList(this.props.searchTerm)}}> 
                        <Text style={styles.searchButtonText}>Search Music</Text>
                    </TouchableOpacity>

                    { music_list_display }

                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        paddingTop:60,
        backgroundColor: '#b3dbff',
    },
    scrollview:{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:60,
        backgroundColor: '#b3dbff',
    },
    searchMusicButton:{
        borderWidth: 1,
        borderColor: '#007BFF',
        borderRadius: 10,
        backgroundColor: '#007BFF',
        width:200,
        padding: 15,
        margin: 5,
        marginBottom: 30
    },
    searchButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center'
    },
    list_item:{
        marginLeft:5,
        marginRight:5,
        padding:5,
        borderWidth:1,
        height:30,
        borderRadius:3,
        borderColor:'#ddd'
    },
});

export default Music;
