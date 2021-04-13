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
    backgroundColor:'aqua',
	alignItems:'center',
	justifyContent:'center',
  },
  
  slide3: {
    flex: 1,
    backgroundColor:'white',
	//alignItems:'center',
	//justifyContent:'center',
	paddingTop:40,
  },
  
  container:{
	flex:1,
	backgroundColor:'transparent',
	alignItems:'center',
	justifyContent:'center',
  },
  textInput: {
	borderColor: '#CCCCCC',
	color: 'black',
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
	marginBottom: 50
  },
  historyButton:{
	borderWidth: 1,
	borderColor: '#007BFF',
	backgroundColor: '#007BFF',
	width:200,
	padding: 15,
  	margin: 5,
	marginBottom: 100
  },
  modelButton:{
    borderWidth: 1,
	borderColor: '#007BFF',
	backgroundColor: '#007BFF',
	width:200,
	padding: 15,
  	margin: 5,
	marginBottom: 50
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

class WeatherScreen extends Component{

	render(){
		return(
		<View>
			<Text style = {{fontSize:30}}>Weather Screen</Text>
		</View>
		)
	}
}


class MusicScreen extends Component {

	render(){
		return(
		<View>
			<Text style = {{fontSize:30}}>Music Screen</Text>
		</View>
		)
	}
}


class SearchScreen extends React.Component{
	constructor(props) {
		super(props);
		this.state = { 
			name: '',
			stored_name:'',
			search_1:'',
			search_2:'',
			search_3:'',
		}
	}
	
	handleNameChange = text => {this.setState({ name: text });}
	
	storeData = async() => {
	   try{
		   await AsyncStorage.setItem('@stored_name',this.state.name)
	   } catch(e){
		   alert('Failed to save the name')
	   }
	}
	
	getData = async() =>{
		try{
			const stored_name = await AsyncStorage.getItem('@stored_name');
			this.setState({stored_name:stored_name})
		}
		catch(e){alert('Failed to get the name')}
	}
	
	clearData = async() =>{
		await AsyncStorage.clear();
	}
	
	FirstModel = async(data) =>{
		if(data != null){
		this.setState({search_1:data})}
		await this.props.parentCallback(this.state.search_1)
	}
	
	SecondModel = async(data) =>{
		if(data != null){
		this.setState({search_2:data})}
		await this.props.parentCallback(this.state.search_2)
	}
	
	ThirdModel = async(data) =>{
		if(data != null){
		this.setState({search_3:data})}
		await this.props.parentCallback(this.state.search_3)
	}
	
	componentDidMount = async() =>{
		const w = require("./assets/weather_words.json");
		
		var Num_1 = Math.floor(Math.random()*45);
		var weather_1 = w.Weather[Num_1];
		
		var Num_2 = Math.floor(Math.random()*45);
		var weather_2 = w.Weather[Num_2];
		
		var Num_3 = Math.floor(Math.random()*45);
		var weather_3 = w.Weather[Num_3];
		
		
		await this.FirstModel(weather_1);
		await this.SecondModel(weather_2);
		await this.ThirdModel(weather_3);
		await this.getData();
		await this.props.parentCallback(this.state.stored_name)
	}

	activate = async() =>{
		await this.storeData();
		await this.getData();
		await this.props.parentCallback(this.state.stored_name)
	}
	
	search_history = async() =>{
		await this.props.parentCallback(this.state.stored_name)
	}

	render(){
	  return(
		<View style={styles.slide3}>
		    <TextInput 
			  style={styles.textInput}
			  placeholder="Search"
			  placeholderTextColor='darkgray'
			  maxLength={20}
			  onBlur={Keyboard.dismiss}
			  onChangeText={this.handleNameChange}
			  clearButtonMode="always"
			  returnKeyType="search"
		    />
			

			<TouchableOpacity style={styles.saveButton}
			  onPress={() => {this.activate();}}> 
			  <Text style={styles.saveButtonText}>Search</Text>
			</TouchableOpacity>
			
			<Text style = {{fontSize:20}}> Search History </Text>

			<TouchableOpacity style={styles.historyButton}
			  onPress={() => {this.search_history()}}> 
			  <Text style={styles.saveButtonText}>{this.state.stored_name}</Text>
			</TouchableOpacity>
			
			<Text style = {{fontSize:20}}> Search Example</Text>
			
			<TouchableOpacity style={styles.modelButton}
			  onPress={() => {this.FirstModel()}}> 
			  <Text style={styles.saveButtonText}>{this.state.search_1}</Text>
			</TouchableOpacity>
			
			<TouchableOpacity style={styles.modelButton}
			  onPress={() => {this.SecondModel()}}> 
			  <Text style={styles.saveButtonText}>{this.state.search_2}</Text>
			</TouchableOpacity>
			
			<TouchableOpacity style={styles.modelButton}
			  onPress={() => {this.ThirdModel()}}> 
			  <Text style={styles.saveButtonText}>{this.state.search_3}</Text>
			</TouchableOpacity>
			
			
         </View>
	  )
	}
}

export default class APP extends Component {
  constructor(props) {
	super(props);
	this.state = {
		Name:'',
		stored_name:'',
		}
	}
	
	setName = (data_1) => {
		this.setState({stored_name:data_1});
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
			<WeatherScreen/>
		  </View>
		  
		  <View style={styles.slide2}>
			<MusicScreen/>
		  </View>
		  
		  <View style={styles.slide3}>
			<SearchScreen parentCallback = {this.setName}/>
		    <Text style = {styles.UserText}>Search Result: {this.state.stored_name}</Text>
		    <Text style = {styles.BottomText}>Created by Xingjian Wang</Text>
		  </View>
		  
        </Swiper>

    )
  }
}



