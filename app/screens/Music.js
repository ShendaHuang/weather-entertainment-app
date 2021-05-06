import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Alert, Button } from 'react-native';
import { Audio } from 'expo-av';
import {FontAwesome5, AntDesign} from '@expo/vector-icons';

const { height } = Dimensions.get('window');

export class Music extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_weather: '',
            music_list: '',
            screenHeight: 0,
			url: null,
			sound: null,
			song_name:'',
			song_names:[],
			isPlay: null,
			genre_id: '',
			song_dict:[],
        }
    }

    onContentSizeChange = (contentWidth, contentHeight) =>{
        this.setState({screenHeight: contentHeight});
    }

    getMusicList = (weather) =>{
        const music_lists = require("../../assets/songWeather.json");
        this.setState({music_list: music_lists[weather]})
    }
	
	_onPressButton() {
	    Alert.alert('Name Saved!')
	}
	
	componentDidMount() {
		this.fetchData(this.props.searchTerm);
	}
	
    fetchData = async(weather) => {
		const apikey = '?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4';
		const web = 'http://api.napster.com/v2.2/';
		
		const music_lists = await require("../../assets/songWeather.json");
		if(music_lists.hasOwnProperty(weather)){
			this.setState({music_list: music_lists[weather]})
		}
		else {
			this.setState({music_list: music_lists['other']})
			Alert.alert('weather is not in record')
		}
		
		const request_string_1 = web + 'genres/' + this.state.music_list[0] + apikey;
		await fetch(request_string_1)
        .then(res => res.json())
        .then(json => {
            this.setState({
                genre_id: json.genres[0].links.childGenres.ids[1]
            });
        });
		
		var track_list = [];
		await fetch(web + 'genres/' + this.state.genre_id + '/tracks/top' + apikey)
		.then(res => res.json())
        .then(json => {
			for(var i = 0; i < json.tracks.length; i++){
				track_list.push(json.tracks[i].id)
			}
        });
		
		var url_track = [];
		var song_names = [];
		var is_play = [];
		for(var i = 0; i < track_list.length; i++){
			await fetch(web + 'tracks/' + track_list[i] + apikey)
			.then(res => res.json())
			.then(json => {
				url_track.push(json.tracks[0].previewURL)
				song_names.push(json.tracks[0].name)
				is_play.push(false)
        });
		}
		
		var dict = [];
		
		for(var i = 0; i < song_names.length; i++){
			dict.push({
				key: i,
				song_name: song_names[i]
			});
		}
		
    	await this.setState({url: url_track, song_names: song_names, isPlay: is_play, song_dict: dict});
		
		this.getMusicList(this.props.searchTerm)
    }
	
    playSound = async(item) => {
		var song_link = this.state.url[item.key]
		var song_name = item.song_name
		var num = item.key
        
        if(song_name != this.state.song_name) {
                console.log('Loading Sound')
	
                const source = {
                    uri: song_link
                }
				
                const { sound } = await Audio.Sound.createAsync(
                    { uri: song_link },
                    { shouldPlay: false }
                );
        
                let { positionMillis } = await sound.getStatusAsync()
                this.setState({sound: sound})
                this.setState({song_name: song_name})
        }	
        
        let { positionMillis } = await this.state.sound.getStatusAsync()
        
		var isPlay = this.state.isPlay
		
        if(isPlay[num] == false) {
			isPlay[num] = true
            this.setState({isPlay: isPlay})
            if(positionMillis == 0) { await this.state.sound.playAsync();}
            else {await this.state.sound.playFromPositionAsync(positionMillis)}
        }
        else {
			isPlay[num] = false
            this.setState({isPlay: isPlay})
            await this.state.sound.pauseAsync(); 
            await this.state.sound.setStatusAsync({positionMillis:positionMillis})
        }
    }
	
    render() {		
		

        const scrollEnabled = this.state.screenHeight > height;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView 
                    style={{ flex: 1 }}
                    contentContainerStyle={styles.scrollview}
                    scrollEnabled={scrollEnabled}
                    onContentSizeChange={this.onContentSizeChange}
                >
                    <Text style={styles.text_music_screen}>Music Screen for weather: {this.props.valueTerm}</Text>
					{
						this.state.song_dict.map((item, index) => (
						  <View key = {item.key} style={styles.list_item}>
							<Text style={styles.text_icon} margin = {200}>
								{item.song_name}
							</Text>
							{this.state.isPlay[item.key] ? 
								<AntDesign key={item.key+100} onPress={() => {this.playSound(item)}} name ="pause" size={22} /> : 
								<FontAwesome5 key={item.key+100} onPress={() => {this.playSound(item)}} name ="play" size={22} /> 
							}
							
						  </View>
						))
					}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop:10,
        backgroundColor: '#b3dbff',
    },
    scrollview:{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:40,
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
        height: 30,
		width:100,
		flex:1,
		justifyContent:'flex-start',
		flexDirection:'row',
        borderRadius:3,
        borderColor:'#ddd'
	},
	text_music_screen:{
		marginBottom: 40,
		fontSize: 20,
		color: '#483d8b',
	},
});


export default Music;
