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
			weather_list: ["thunderstorm", "drizzle", "rain", "snow", "clouds", "clear sky", "sunny", "cloudy", "rainy", "mist", "smoke", "haze", "fog", "sand", "dust", "tornado"],
			weather_search:'',
        }
    }
      
    setName = (data_1) => {
        this.setState({stored_name:data_1});
    }

    SetWeather = (weather_condition) => {
		this.setState({weather_value:weather_condition})
		weather_condition = weather_condition.toLowerCase();
		for(var i in this.state.weather_list){
			var cur_weather = this.state.weather_list[i];
			if( weather_condition.includes(cur_weather)){
				weather_condition = cur_weather.trim();
				break;
			}
		}
        this.setState({weather_search:weather_condition})
    }
  
    render() {
        return(
            <Tab.Navigator>
                <Tab.Screen name='Weather' children={() =><Weather weatherSetter={this.SetWeather}/>} options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="weather-partly-cloudy" size={size} color={color} />
                    ),
                }} />
                <Tab.Screen name='Music' children={() =><Music valueTerm={this.state.weather_value} searchTerm={this.state.weather_search}/>} options={{
                    unmountOnBlur: true,
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
