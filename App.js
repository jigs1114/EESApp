import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NetInfo from "@react-native-community/netinfo";
import SplashScreen from './src/components/SplashScreen';
import Dashboard from './src/components/Dashboard';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EndScreen from './src/components/EndScreen';



export class App extends Component {
  NetInfoSubcription = null;
  constructor(props) {
    super(props);
    this.state = {
      connectionStatus: false,
      isInternetReachable: false,
    }
  }

  componentDidMount = () => {

      this.NetInfoSubcription = NetInfo.addEventListener(
        this._handleConnectivityChange,
      )
  }

  componentWillUnmount = () => {
    this.NetInfoSubcription && this.NetInfoSubcription();
  }

  _handleConnectivityChange = (state) => {
    console.log('satussssss', state);
    this.setState({
      connectionStatus: state.isConnected,
      isInternetReachable: state.isInternetReachable
    })
  }


 
  render() {
    const Stack = createNativeStackNavigator();
    const connection = this.state.connectionStatus;
    const isInternetReachable = this.state.isInternetReachable;
    return connection && isInternetReachable ? (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='/'>
          <Stack.Screen name="/" options={{ header: () => null }} component={SplashScreen} />
          <Stack.Screen name="/dashboard" options={{ header: () => null }} component={Dashboard} />
          <Stack.Screen name="/end" options={{ header: () => null }} component={EndScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    ) :
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <FontAwesome5 name={'wifi'} size={100} color="grey" solid />
        <Text style={{
          fontSize: 50,
          marginTop: 0,
          color: 'grey',
          fontWeight: 'bold'
        }}> Connecting! </Text>
        <Text style={{
          fontSize: 28,
          marginTop: 20,
          color: 'grey',
          fontWeight: 'bold'
        }}> No Internet </Text>
      </View>
  }
}

export default App
