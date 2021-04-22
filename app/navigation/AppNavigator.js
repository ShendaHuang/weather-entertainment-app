import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Weather from '../screens/Weather';
import Music from '../screens/Music';
import Search from '../screens/Search';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';


const Tab = createBottomTabNavigator()

export default class AppNavigator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name:'',
            stored_name:'',
            weather_value:'',
        }
    }
      
    setName = (data_1) => {
        this.setState({stored_name:data_1});
    }

    SetWeather = (weather_condition) => {
        this.setState({weather_value:weather_condition})
    }
  
    render() {
        return(
            <Tab.Navigator>
                <Tab.Screen name='Weather' children={() =><Weather weatherSetter={this.SetWeather}/>} options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="weather-partly-cloudy" size={size} color={color} />
                    ),
                }} />
                <Tab.Screen name='Music' children={() =><Music searchTerm={this.state.weather_value}/>} options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialIcons name="library-music" size={size} color={color} />
                    ),
                }} />
                <Tab.Screen name='Search' children={() =><Search weatherSetter={this.SetWeather}/>} options={{
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome5 name="search" size={size} color={color} />
                    ),
                }} />
            </Tab.Navigator>
        )
    }
  }
