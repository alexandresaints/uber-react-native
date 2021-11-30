import React from 'react';
import {Image, Text, View, TouchableOpacity, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator  } from '@react-navigation/native-stack';

import UberMap from '../components/Map';
import Navbar from '../components/Navbar';

const Main = createNativeStackNavigator()

function Header(){
    return(
        <UberMap/>
    )
}
function LoginScreen({navigation}){
    return(
        <>
        <View>
        <View style={{alignItems: 'center', top: 100}}>
         <Text style={{fontSize: 32}}>Gasolina</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center', top: 300}}>
            <View>
                <Text style={{color: 'black', fontSize: 18}}>
                    Clique abaixo para calcular sua rota.
                </Text>
            </View>
                <TouchableOpacity 
                onPress={() => navigation.push('Uber')}
                style={{backgroundColor: 'blue', padding: 20, marginTop: 10}}
                >
                <Text style={{color: 'white', fontSize: 18}}>
                    Checar rota <Icon name="arrow" size={18} color="#FFF" />
                </Text>
                </TouchableOpacity>
        </View>
        </View>
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
            <Main.Navigator initialRouteName="LoginScreen">
                <Main.Screen name='Home' component={LoginScreen} options={{headerShown: false}}/>
                <Main.Screen name='Uber' component={Header} options={{headerShown: false}}/>
            </Main.Navigator>
        </NavigationContainer>
        </>
    )
}