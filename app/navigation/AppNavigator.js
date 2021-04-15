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
        }
    }
      
    setName = (data_1) => {
        this.setState({stored_name:data_1});
    }
  
    render() {
        return(
            <Tab.Navigator>
                <Tab.Screen name='Weather' component={Weather} options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="weather-partly-cloudy" size={size} color={color} />
                    ),
                }} />
                <Tab.Screen name='Music' component={Music} options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialIcons name="library-music" size={size} color={color} />
                    ),
                }} />
                <Tab.Screen name='Search' component={Search} options={{
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome5 name="search" size={size} color={color} />
                    ),
                }} 
                />
            </Tab.Navigator>
        )
    }
  }
