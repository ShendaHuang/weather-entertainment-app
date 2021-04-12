import React, { Component } from 'react'
import { View, Image, StatusBar, StyleSheet, Text, TouchableOpacity, TextInput, Keyboard, Alert, Button} from 'react-native'
import Swiper from 'react-native-swiper'
import AsyncStorage from '@react-native-community/async-storage'

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
	width:400,
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
	marginBottom:50,
  },
  
  BottomText:{
	color:'#FFFFFF',
	fontSize: 20,
	textAlign: 'center',
  },
  
  TopText:{
	color:'#007BFF',
	fontSize: 40,
	textAlign: 'center',
	marginBottom: 30
  },
  
  ActiveDot:{
	backgroundColor: '#fff',
    width: 10,
    height: 10,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7
  },
  
   Dot:{
	backgroundColor: 'rgba(255,255,255,.3)',
    width: 10,
    height: 10,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7
   }
});

class HomeScreen extends Component{
	constructor(props) {
		super(props);
		this.state = { 
			name: '',
			stored_name:'',
			stored_time:'',
		}
	}
	
	handleNameChange = text => {this.setState({ name: text });}
	
	storeData = async() => {
	   var timeStamp = new Date().toLocaleString('en-US');
	   try{
		   await AsyncStorage.setItem('@stored_name',this.state.name)
		   await AsyncStorage.setItem('@stored_time',timeStamp)
	   } catch(e){
		   alert('Failed to save the name')
	   }
	}
	
	getData = async() =>{
		try{
			const stored_name = await AsyncStorage.getItem('@stored_name');
			const stored_time = await AsyncStorage.getItem('@stored_time');
			this.setState({stored_name:stored_name})
			this.setState({stored_time:stored_time})
		}
		catch(e){alert('Failed to get the name')}
	}
	
	clearData = async() =>{
		await AsyncStorage.clear();
	}
	
	componentDidMount = async() =>{
		//await this.clearData();
		await this.getData();
		await this.props.parentCallback(this.state.stored_name,this.state.stored_time)
	}

	activate = async() =>{
		await this.storeData();
		await this.getData();
		await this.props.parentCallback(this.state.stored_name,this.state.stored_time)
	}

	render(){
	  return(
		<View style={styles.slide1}>
		    <Text style={styles.TopText}> VU GeoFacts App</Text>
		    <TextInput 
			  style={styles.textInput}
			  placeholder="Your name"
			  placeholderTextColor='ivory'
			  maxLength={20}s
			  onBlur={Keyboard.dismiss}
			  onChangeText={this.handleNameChange}
			  clearButtonMode="always"
		    />
			

			<TouchableOpacity style={styles.saveButton}
			  onPress={() => {this.activate();}}> 
			  <Text style={styles.saveButtonText}>Submit Name</Text>
			</TouchableOpacity>
			
			
            <Image
              style = {styles.Image}
              source={require('./img/Villanova.png')}
            />
			
			<Text style={styles.BottomText}>Hello {this.state.stored_name}</Text>
			<Text style={styles.BottomText}>Last Entered: {this.state.stored_time}</Text>
			
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
		building:null,
		facts:null,
		gps:null,
		fact:null,
		};
	}
	
	activate = async() => {
		var min = 5;
		var result_x = 0;
		
		const b = require("./assets/gpsbuildings.json");
		const f = require("./assets/facts.json");
		
		navigator.geolocation.getCurrentPosition(
		(position) => {
			this.setState({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
				error: null,
			});

			if(this.state.latitude != null){
				for(var x=0; x<4; x++){
					var result = Math.sqrt(Math.pow(this.state.latitude-b[x].Latitude , 2) + Math.pow(this.state.longitude-b[x].Longitude , 2));
					if(result < min){ min = result; result_x = x;}
				}

				this.setState({ building: b[result_x].Building})
		
				var bname = b.[result_x].Building;

				var factNum = Math.floor(Math.random()*5);
		
				var factstring = f[bname][factNum];
				this.setState({ facts:factstring})
			}
		},
		(error) => this.setState({ error: error.message }),
		{enableHighAccuracy: false, timeout: 5000, maximumAge: Infinity },
		);
	}
	render(){
	  var lat = this.state.latitude;
	  var lon = this.state.longitude;
	  if(lat!=null){
		var _lat = lat.toFixed(6);
		var _lon = lon.toFixed(6);
	  }
	  final_lat = _lat;
	  final_lon = _lon;
	  return(  
		<View style = {styles.container}>
			<TouchableOpacity style={styles.GPSButton}
				onPress={() => {this.activate()}}>
				<Text style={styles.GPSText}>Tell Me About My Location</Text>  
			</TouchableOpacity>
			
			<Text style = {{fontSize:30}}>Lat: {final_lat}</Text>
			<Text style = {{fontSize:30}}>Lon: {final_lon}</Text>
			
			<Text style = {{fontSize:30}}>Closest Building: {this.state.building}</Text>
			
			<Text style = {{fontSize:20, marginBottom:50, marginTop:5, marginRight:10, marginLeft:10}}>Fact: {this.state.facts}</Text>

			<Image source={require('./img/Geo.png')} style={styles.Image}/>
			
			<Text style = {{fontSize:20}}>Hello {this.props.Stored_name}</Text>
			<Text style = {{fontSize:20}}>Last Entered: {this.props.Stored_time}</Text>
		</View>
		)
	}
}


export default class APP extends Component {
  constructor(props) {
	super(props);
	this.state = {
		stored_name:'',
		stored_time:'',
		lat:null,
		lon:null
		}
	}

	setName = (data_1,data_2) => {
		this.setState({stored_name:data_1,stored_time:data_2});
	}
	
  render() {
    return (
        <Swiper
          style={styles.wrapper}
          dot={
            <View style={styles.Dot}/>
          }
          activeDot={
            <View style={styles.ActiveDot}/>
          }
          paginationStyle={{
            bottom: 70
          }}
          loop={false}
        >
		  
		  <View style={styles.slide1}>
		   <HomeScreen parentCallback = {this.setName}/>
          </View>
		  
		  <View style={styles.slide2}>
		    <GeolocationExample Stored_name = {this.state.stored_name} Stored_time = {this.state.stored_time}/>
		  </View>
		  
        </Swiper>

    )
  }
}