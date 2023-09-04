import React, { Component } from 'react'
import {  View, Image,  } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import logo from '../assets/welcome.png'

export class SplashScreen extends Component {
   
    
    componentDidMount() {
        this._gotoDashboard()

    }

    _gotoDashboard = () => {
        setTimeout(() => {
            this.props.navigation.replace('/dashboard')        
        }, 3000);
    }

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {/* <FontAwesome5 name={'smile'} size={50} color="#00196f" solid /> */}
                <Image source={logo} resizeMode='cover' style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                }} />
                {/* <Text style={{
                    fontSize: 28,
                    marginTop:20,
                    color: '#00196f',
                    fontWeight: 'bold'
                }}> Wel Come to App </Text> */}
            </View>
        )
    }
}

export default SplashScreen
