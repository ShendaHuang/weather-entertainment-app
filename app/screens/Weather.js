import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

export class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            town: null,
            lat: null,
            lon: null,
        };
    }

    componentDidMount = async() =>{
		this.getLocation();
	}

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

    getLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 5000, maximumAge: Infinity},
        );
        if (this.state.lat!=null && this.state.lon!=null) {
            this.getWeather(this.state.lat, this.state.lon);
        }
    }

    getWeather = (lat, lon) => {
        var apiKey = '3ff190e2984594ee2f1ef45fdd4108a5'
       
        var fetchURL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat.toString() + '&lon=' + lon.toString() + '&appid=' + apiKey + '&units=imperial'
        
        // this.setState({fURL: fetchURL})
        fetch(fetchURL)
        .then(res => res.json())
        .then(json => {
            this.setState({
                temp: json.main.temp,
                town: json.name,
                weather: json.weather[0].description,
                temp_max:json.main.temp_max,
                temp_min:json.main.temp_min,
                icon: json.weather[0].icon,
                loaded:true
            });
        });
    }

    render() {
        let pic = { uri: 'http://openweathermap.org/img/wn/' + this.state.icon + '@2x.png'};
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.state.town}</Text>
                <Text style={styles.weatherText}>{this.state.weather}</Text>
                <Text></Text>
                <Text></Text>
                <Text style={styles.tText}>{this.state.temp}°F</Text>
                <Text></Text>
                <Text></Text>
                <Text style={styles.tempText}>H: {this.state.temp_max}°F  L: {this.state.temp_min}°F</Text>
                <Text></Text>
                <Text></Text>

                <Image source={pic} style={{width: 200, height:180}}/>
            
                <TouchableOpacity style={styles.buttonContainer} onPress={()=>this.getLocation()}>
                    <Text style={styles.bText}>Get Weather</Text>
                </TouchableOpacity>
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
    },
    text: {
        color: 'white',
        fontSize: 50,
    },
    bText: {
        color: '#094780',
        fontSize: 20,
        textAlign: 'center'
    },
    buttonContainer: {
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        width: 180,
        height: 30,
        alignItems: 'center',
    },
    weatherText: {
        color: 'white',
        fontSize: 25,
    },
    tempText: {
        color: 'white',
        fontSize: 20,
    },
    tText: {
        color: 'white',
        fontSize: 70,
    },
});

export default Weather;