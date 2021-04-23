import React, { Component } from 'react';
<<<<<<< HEAD
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
=======
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Alert } from 'react-native';
import { Audio } from 'expo-av';
import {FontAwesome5, AntDesign} from '@expo/vector-icons';
>>>>>>> d202bbfd1e28ce512a2b4d06ac1f3c33f7305b65

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
<<<<<<< HEAD
=======
	
  Sound = async() => {
    console.log('Loading Sound')
	
	this.sound = new Audio.Sound();
	
    this.sound.loadAsync(
       require('../../assets/bumblebee-sound.mp3')
    );
 
	let { positionMillis } = await this.sound.getStatusAsync()
	}
	
  playSound = async() => {
	console.log('Playing Sound');
	let { positionMillis } = await this.sound.getStatusAsync()
	if(positionMillis == 0) { await this.sound.playAsync();}
    else {await this.sound.playFromPositionAsync(positionMillis)}
	}
	

  pauseSound = async() => {
	  
    await this.sound.pauseAsync(); 
	let { isLoaded, isPlaying, positionMillis } = await this.sound.getStatusAsync()
	console.log(positionMillis)
	await this.sound.setStatusAsync({positionMillis:positionMillis})
  }
>>>>>>> d202bbfd1e28ce512a2b4d06ac1f3c33f7305b65

    onContentSizeChange = (contentWidth, contentHeight) =>{
        this.setState({screenHeight: contentHeight});
    }
<<<<<<< HEAD

=======
	
>>>>>>> d202bbfd1e28ce512a2b4d06ac1f3c33f7305b65
    getMusicList = (weather) =>{
        const music_lists = require("../../assets/songWeather.json");
        // this.setState({music_list: music_lists["Sunny"]})
        this.setState({music_list: music_lists[weather]})
    }
<<<<<<< HEAD
=======
	
	_onPressButton() {
	Alert.alert('Name Saved!')
	}
>>>>>>> d202bbfd1e28ce512a2b4d06ac1f3c33f7305b65
    
    render() {
        
        var music_list_display = [];
        for(var i in this.state.music_list){
            var text = (
            <View key={i} style={styles.list_item}>
<<<<<<< HEAD
                <Text
                    // onPress={this.show.bind(this, this.props.music_list_display[i])}
                    numberOfLines={1}
                    style={styles.list_item_font}>
                    {this.state.music_list[i]}
                </Text>
=======
				<TouchableOpacity style={styles.text_icon}
					onPress={() => {this.Sound()}}>
                <Text margin = {200}
                    // onPress={this.show.bind(this, this.props.music_list_display[i])}
                    numberOfLines={1}>
                    {this.state.music_list[i]}
                </Text>
				</TouchableOpacity>
				<FontAwesome5 
					onPress={() => {this.playSound()}} name ="play" size={22} />
				<AntDesign
					onPress={() => {this.pauseSound()}} name ="pause" size={22} />
>>>>>>> d202bbfd1e28ce512a2b4d06ac1f3c33f7305b65
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
<<<<<<< HEAD
        height:30,
        borderRadius:3,
        borderColor:'#ddd'
    },
=======
        height:40,
		flex:1,
		flexDirection:'row',
        borderRadius:3,
        borderColor:'#ddd'
    },
	text_icon:{
		marginLeft:5,
        marginRight:5,
        padding:5,
        //borderWidth:1,
        height: 30,
		width:100,
		flex:1,
		justifyContent:'flex-start',
		flexDirection:'row',
        borderRadius:3,
        borderColor:'#ddd'
	},
>>>>>>> d202bbfd1e28ce512a2b4d06ac1f3c33f7305b65
});

export default Music;
