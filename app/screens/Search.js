import React, { Component, createContext } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

export class Search extends Component {
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

	storeData = async(data) => {
	   try{
		   await AsyncStorage.setItem('@stored_name',data)
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
    
    SetModels = async(data1, data2, data3) => {
        if(data1 != null && data2 != null && data3 != null) {
            this.setState({search_1:data1, search_2:data2, search_3:data3})
        }
    }

	FirstModel = async() =>{
		this.setState({stored_name:this.state.search_1})
		console.log(this.state.search_1)
        await this.storeData(this.state.search_1);
		//await this.props.parentCallback(this.state.search_1)
	}
	
	SecondModel = async() =>{
		this.setState({stored_name:this.state.search_2})
        await this.storeData(this.state.search_2);
		//await this.props.parentCallback(this.state.search_2)
	}
	
	ThirdModel = async() =>{
		this.setState({stored_name:this.state.search_3})
        await this.storeData(this.state.search_3);
		//await this.props.parentCallback(this.state.search_3)
	}
	
	componentDidMount = async() =>{
		const w = require("../../assets/weather_words.json");
		
		var Num_1 = Math.floor(Math.random()*45);
		var weather_1 = w.Weather[Num_1];
		
		var Num_2 = Math.floor(Math.random()*45);
		var weather_2 = w.Weather[Num_2];
		
		var Num_3 = Math.floor(Math.random()*45);
		var weather_3 = w.Weather[Num_3];
		
		await this.SetModels(weather_1, weather_2, weather_3);
		await this.getData();
		// await this.props.parentCallback(this.state.stored_name)
	}

	activate = async() =>{
		await this.storeData(this.state.name);
		await this.getData();
		// await this.props.parentCallback(this.state.stored_name)
	}
	
	search_history = async() =>{
		// await this.props.parentCallback(this.state.stored_name)
	}

    updateState = (prevState, newState = {}) => {
        this.setState({...prevState, ...newState});
    };

	render(){
	    return(             
            <View style={styles.container}>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Search"
                    placeholderTextColor='ivory'
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

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'white',
        //alignItems:'center',
        //justifyContent:'center',
        paddingTop:40,
        backgroundColor: '#b3dbff',
    },
    textInput:{
        borderColor: 'black',
        color: 'black',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 50,
        width: 400,
        fontSize: 25,
        paddingLeft: 20,
        paddingRight: 20,
    },
    saveButtonText: {
      color: '#FFFFFF',
      fontSize: 20,
      textAlign: 'center'
    },
    saveButton: {
        borderWidth: 1,
        borderColor: '#007BFF',
        borderRadius: 10,
        backgroundColor: '#007BFF',
        width:400,
        padding: 15,
        margin: 5,
        marginBottom: 50
    },
    historyButton:{
        borderWidth: 1,
        borderColor: '#007BFF',
        borderRadius: 10,
        backgroundColor: '#007BFF',
        width:200,
        padding: 15,
        margin: 5,
        marginBottom: 100
    },
    modelButton:{
        borderWidth: 1,
        borderColor: '#007BFF',
        borderRadius: 10,
        backgroundColor: '#007BFF',
        width:200,
        padding: 15,
        margin: 5,
        marginBottom: 30
    },
});

export default Search;
