import React, { Component } from 'react'
import { View, Image, StatusBar, StyleSheet, Text, TouchableOpacity, TextInput, Keyboard, Alert, Button} from 'react-native'

export class SearchScreen extends Component {
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