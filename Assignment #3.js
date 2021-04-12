import React, { Component } from 'react'
import { View, Image, StatusBar, StyleSheet, Text, TouchableOpacity, TextInput, Keyboard, Alert, Button} from 'react-native'
import Swiper from 'react-native-swiper'

const styles = StyleSheet.create({
  wrapper: {
  },

  slide1: {
    flex: 1,
    backgroundColor: '#001F5B',
	alignItems:'center',
	justifyContent:'center',
  },
  
  slide2: {
    flex: 1,
    backgroundColor:'aqua',
	alignItems:'center',
	justifyContent:'center',
  },
  
  slide3: {
    flex: 1,
    backgroundColor:'deepskyblue',
	alignItems:'center',
	justifyContent:'center',
  },
  
  container:{
	flex:1,
	backgroundColor:'transparent',
	alignItems:'center',
	justifyContent:'center',
  },
  textInput: {
	borderColor: '#CCCCCC',
	color: 'ghostwhite',
	borderTopWidth: 1,
	borderBottomWidth: 1,
	height: 50,
	width: 400,
	fontSize: 25,
	paddingLeft: 20,
	paddingRight: 20,
  },
  saveButton: {
	borderWidth: 1,
	borderColor: '#007BFF',
	backgroundColor: '#007BFF',
	width:400,
	padding: 15,
  	margin: 5,
	marginBottom: 100
  },
  GPSButton:{
	borderWidth: 1,
	borderColor: '#007BFF',
	backgroundColor: 'white',
	width:250,
	padding: 15,
  	margin: 5,  
  },
  GPSText:{
	color: 'black',
	fontSize: 30,
	textAlign: 'center'  
  },
  saveButtonText: {
	color: '#FFFFFF',
	fontSize: 20,
	textAlign: 'center'
  },
  Image:{
	alignItems:'center',
	justifyContent:'center',
	width:230,
	height:205,
	marginBottom:5,
  },
  UserText:{
	color:'#007BFF',
	fontSize: 20,
	textAlign: 'center',
  },
  BottomText:{
	color:'#007BFF',
	fontSize: 12,
	textAlign: 'center',
	marginBottom: 20
  },
  TopText:{
	color:'#007BFF',
	fontSize: 40,
	textAlign: 'center',
	marginBottom: 30
  }
});

class HomeScreen extends Component{
	constructor(props) {
		super(props);
		this.state = { 
			name: '',
		}
	this.handleNameChange = this.handleNameChange.bind(this);
	}
	
	handleNameChange(name) {
	this.setState({ name });
	}
	
   _onPressButton() {
	Alert.alert('Name Saved!')
	}
	
	render(){
	  var Name = this.state.name;
	  return(
		<View style={styles.slide1}>
		    <Text style={styles.TopText}> Geo Navigate App</Text>
		    <TextInput 
			  style={styles.textInput}
			  placeholder="Your name"
			  placeholderTextColor='ivory'
			  
			  maxLength={20}s
			  onBlur={Keyboard.dismiss}
			  value={this.state.name}
			  onChangeText={this.handleNameChange}
			  clearButtonMode="always"
		    />

			<TouchableOpacity style={styles.saveButton}
			  onPress={() => {this._onPressButton(); {this.props._setName(Name)};}}>
			  <Text style={styles.saveButtonText}>Save</Text>
			</TouchableOpacity>
			
            <Image
              style = {styles.Image}
              source={require('./img/Villanova.png')}
            />
         </View>
	  )
	}
}


class GeolocationExample extends Component {

	constructor(props) {
		super(props);
		this.state = {
		latitude: null,
		longitude: null,
		error: null,
		};
	}
	activate(pc) {
		navigator.geolocation.getCurrentPosition(
		(position) => {
			this.setState({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
				error: null,
			});
			pc(position.coords.latitude,position.coords.longitude);
		},
		(error) => this.setState({ error: error.message }),
		{enableHighAccuracy: false, timeout: 5000, maximumAge: Infinity },
		);
		
	}
	render(){
	  return(  
		<View style = {styles.container}>
			<TouchableOpacity style={styles.GPSButton}
				onPress={() => {this.activate((lat,lon) => {this.props.parentControl(lat,lon)});}}>
				<Text style={styles.GPSText}>Activate GPS</Text>  
			</TouchableOpacity>
			
			<Text style = {{fontSize:30}}>Lat: {this.state.latitude}</Text>
			<Text style = {{fontSize:30, marginBottom:50}}>Lon: {this.state.longitude}</Text>
			<Image source={require('./img/Geo.png')} style={{width: 200, height:180}}/>
		</View>
		)
	}
}


class WeatherScreen extends React.Component{
	state = {
		latitude:30,
		longitude: 30,
		temp: 0,
		unit: 'Celsius',
		isF: false,
		town: null,
		weather: null,
	}
	
	fetchWeather(lat = 25, lon = 25) {
	var request_string = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=aaea1de97ee8f87cc3aab5301d589ca2&units=metric';
	fetch(request_string)
	.then(res => res.json())
	.then(json => {
	this.setState({
		town: json.name,
		temp: json.main.temp,
		weather: json.weather[0].description,
		temp_max:json.main.temp_max,
		temp_min:json.main.temp_min,
		icon: json.weather[0].icon,
		});
	});
	}
	
	render(){
		var lat = this.props.lat;
		var lon = this.props.lon;
		if(lat != null && lon != null){
			this.fetchWeather(lat,lon);
		}	
		let pic = { uri: 'http://openweathermap.org/img/wn/' + this.state.icon + '@2x.png'};
		return(
		<View style = {styles.container}>
		
			<Text style = {{fontSize:50}}>{this.state.town}</Text>
			<Text style = {{fontSize:40}}>{this.state.weather}</Text>
			<Text style = {{fontSize:60}}>{this.state.temp}℃</Text>
			<Text style = {{fontSize:25}}>Max temp: {this.state.temp_max}℃  Min temp: {this.state.temp_min}℃</Text>
			<Image source={pic} style={{width: 300, height:280}}/>
		</View>
		)
	   }
}

export default class APP extends Component {
  constructor(props) {
	super(props);
	this.state = {
		Name:'',
		lat:null,
		lon:null
		}
	}
	
   _setName(Name){
	   this.setState({
		   Name:Name,
	   });
    }
   _setGeo(lat,lon) {
		this.setState({
			lat: lat,
			lon: lon,
		});
	}
  render() {
    return (
        <Swiper
          style={styles.wrapper}
          dot={
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,.3)',
                width: 10,
                height: 10,
                borderRadius: 7,
                marginLeft: 7,
                marginRight: 7
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: '#fff',
                width: 10,
                height: 10,
                borderRadius: 7,
                marginLeft: 7,
                marginRight: 7
              }}
            />
          }
          paginationStyle={{
            bottom: 70
          }}
          loop={false}
        >
		  
		  <View style={styles.slide1}>
		   <HomeScreen _setName = {this._setName.bind(this)}/>
		   <Text style = {styles.UserText}>User Name: {this.state.Name}</Text>
		   <Text style = {styles.BottomText}>Created by Xingjian Wang</Text>
          </View>
		  
		  
		  <View style={styles.slide2}>
		    <GeolocationExample parentControl = {(lat,lon) => {this._setGeo(lat,lon);}}/>
		    <Text style = {styles.UserText}>User Name: {this.state.Name}</Text>
			<Text style = {styles.BottomText}>Created by Xingjian Wang</Text>
		  </View>
		  
		  
          <View style={styles.slide3}>
			<WeatherScreen lat = {this.state.lat} lon = {this.state.lon}/>
			<Text style = {styles.UserText}>User Name: {this.state.Name}</Text>
			<Text style = {styles.BottomText}>Created by Xingjian Wang</Text>
          </View>
		  
        </Swiper>

    )
  }
}