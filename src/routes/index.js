import React from 'react';
import {Image, View, TouchableOpacity, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator  } from '@react-navigation/native-stack';

import UberMap from '../components/Map';

const Main = createNativeStackNavigator()

function Header(){
    return(
        <UberMap/>
    )
}
function LoginScreen({navigation}){
    return(
        <>
        <TouchableOpacity style={{width: 355, top: 460, justifyContent: 'center', left: 20, zIndex: 1000}}>
            <Button 
            title='Entrar'
            onPress={() => navigation.navigate('Instagram')}
            />
        </TouchableOpacity>
        <Login/>

    </>
    )
}

function LogoTitle() {
    return (
        <Navbar/>
    )
}

export default function Route(){
    return(
        <>
        <NavigationContainer>
            <Main.Navigator initialRouteName="Login">
                <Main.Screen name='Uber' component={Header} options={{ headerTitle: (props) => <LogoTitle {...props} />, headerBackVisible: false }}/>
                <Main.Screen name='Login' component={LoginScreen} options={{headerShown: false}} />
            </Main.Navigator>
        </NavigationContainer>
        </>
    )
}