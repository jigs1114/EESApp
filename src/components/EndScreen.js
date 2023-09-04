import React, { Component } from 'react'
import { BackHandler, Text, View, Image } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import logo from '../assets/thankyou.png'
export class EndScreen extends Component {
    componentDidMount(){
        setTimeout(() => {
            BackHandler.exitApp()
            this.props.navigation.replace('/')
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
                }}> આભાર ! તમારો દિવસ શુભ રહે.  </Text>
                <Text style={{
                    fontSize: 28,
                    marginTop:20,
                    color: '#00196f',
                    fontWeight: 'bold'
                }}> धन्यवाद ! आपका दिन शुभ रहे।  </Text>
                <Text style={{
                    fontSize: 28,
                    marginTop:20,
                    color: '#00196f',
                    fontWeight: 'bold'
                }}> Thank you! Have a nice day! </Text> */}
            </View>
        )
    }
}

export default EndScreen
