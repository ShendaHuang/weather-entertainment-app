import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, Button, TextInput } from 'react-native';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-community/async-storage'


class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {textvalue: "", timevalue: ""};
  }

  handleText = (text) => {
    this.setState({textvalue: text});
    this.handleTime();
  }

  handleTime = (time) => {
    var timestamp = new Date().toLocaleString('en-US')
    this.setState({timevalue: timestamp})
  }

  submitName = () => {
    this.props.nameSetter(this.state.textvalue);
  }

  submitTime = () => {
    this.handleTime();
    this.props.timeSetter(this.state.timevalue);
  }

  render() {
     return(
        <>
        <Text style={styles.title}>VU GeoFacts</Text>
        <TextInput style={styles.inputNameText} 
                   placeholder="Enter Name Here"
                   clearButtonMode="always"
                   onChangeText={this.handleText}/>
        <Button title="Submit Name"
                onPress={() => {this.submitName(); this.submitTime();}}/>
        <Image style = {styles.image} source={require('./img/Villanova.png')} />
        </>
     );
  }

}


class VUTourScreen extends Component {

   constructor(props) {
      super(props);
      this.state = {lat: null, lon: null, building: null, fact: null};
   }

   getGPS = () => {
      navigator.geolocation.getCurrentPosition(
         (position) => {
            this.setState({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
              error: null,});
              this.props.gpsSetter(position.coords.latitude, position.coords.longitude);

            const buildings = require("./assets/gpsbuildings.json");
            const facts = require("./assets/facts.json");
            var closest_building = 0;
            var min_distance = 100;

            if(this.state.lat!=null && this.state.lon!=null) {
              for(var i=0; i<4; i++) {
                var distance = Math.sqrt(Math.pow(this.state.lat-buildings[i].Latitude,2) + Math.pow(this.state.lon-buildings[i].Longitude,2));
                if(distance < min_distance) {
                  min_distance = distance;
                  closest_building = i;
                }
              }
              var bname = buildings[closest_building].Building;
              var random_fact = Math.floor(Math.random()*5);
              this.setState({building: bname, fact: facts[bname][random_fact]});
            }

          },
          (error) => this.setState({ error: error.message }),
          { timeout: 20000, maximumAge: 1000 },
      );
   }


   render() {
     return(<>
            <Text style={styles.title}>VU Tour Screen</Text>
            <Image source={require('./img/GPS.jpg')} style={{width: 200, height:180, marginBottom:10}}/>
            <Button title="Tell Me About My Location"
                    onPress={this.getGPS}/>
            <Text style={styles.TourInfoText}>Latitude: {this.state.lat}</Text>
            <Text style={styles.TourInfoText}>Longitude: {this.state.lon}</Text>
            <Text style={styles.TourInfoText}>Cloest Building: {this.state.building}</Text>
            <Text style={{fontSize: 20, marginHorizontal: 20, marginBottom: 60}}>Fact: {this.state.fact}</Text>
            <Text style={styles.UserInfoText}>Hello {this.props.user} </Text>
            <Text style={styles.UserInfoText}>Last Entered: {this.props.timestamp}</Text>
           </>)
   }
}


class SwiperSet extends Component {

   constructor(props) {
      super(props);
      this.state = {user: "", 
                    timestamp: "",
                    previousname: "",
                    previoustime: "",
                    lat: null, 
                    lon: null};
   }

   storeData = async () => {
    try {
      await AsyncStorage.setItem('@previousname',this.state.user)
		  await AsyncStorage.setItem('@previoustime',this.state.timestamp)
    } catch (e) {
      alert('Storing name and timestamp failed')
    }
   }

   getData = async () => {
    try {
      const stored_name = await AsyncStorage.getItem('@previousname');
			const stored_time = await AsyncStorage.getItem('@previoustime');
			this.setState({previousname:stored_name, previoustime:stored_time});
    } catch(e) {
      alert('Getting name and timestamp failed')
    }
  }

   componentDidMount = async() =>{
     try {
      await this.getData();
      this.setState({user: this.state.previousname, timestamp: this.state.previoustime});
     } catch(e) {
      alert('Mounting components failed')
     }
	 }

   nameSetter = async(name) => {
      await AsyncStorage.clear();
      this.setState({user: name});
      await this.storeData();
   }

   timeSetter = (time) => {
      this.setState({timestamp: time});
      this.storeData();
   }

   gpsSetter = (lat,lon) => {
      this.setState({lat: lat, lon: lon});
   }


   render() {
      return (<Swiper style={styles.wrapper} showsButtons={false} index={0} loop={false}>
                 <View style = {styles.container}>
                     <HomeScreen nameSetter={(name) => {this.nameSetter(name)}} 
                                timeSetter={(time) => {this.timeSetter(time)}}/>
                     <Text style={styles.UserInfoText}>Hello {this.state.user}</Text>
                     <Text style={styles.UserInfoText}>Last Entered: {this.state.timestamp}</Text>
                 </View>
                 <View style={styles.container}>
                     <VUTourScreen gpsSetter={this.gpsSetter}
                                user={this.state.user}
                                timestamp={this.state.timestamp}/>
                 </View>
              </Swiper>); 
   }
}


export default class App extends Component {
  render() {
    return (<SwiperSet/>);
  }
}


const styles = StyleSheet.create({
    wrapper: { },
    title: {
       color: 'black',
       fontSize: 30, 
       marginBottom: 10,
    },
    UserInfoText: {
       color: 'black',
       fontSize: 20,
       justifyContent: 'center',
    },
    inputNameText: {
      borderColor: '#CCCCCC',
      color: 'aqua',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      height: 50,
      width: 400,
      fontSize: 25,
      paddingLeft: 20,
      paddingRight: 20,
      marginTop: 5,
      marginBottom: 5,
    },
    TourInfoText: {
       color: 'black',
       fontSize: 20, 
       marginHorizontal: 20,
    },
    container: {
       flex: 1,
       backgroundColor: 'white', 
       alignItems: 'center', 
       justifyContent: 'center',
    },
    image:{
      alignItems:'center',
      justifyContent:'center',
      width:210,
      height:200,
      marginBottom:30,
    },
});
