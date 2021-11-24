import React, {Component} from "react";
import { View, Text, StyleSheet } from "react-native";
import Geolocation from '@react-native-community/geolocation';
import MapView from "react-native-maps";
import Search from "../Search";

export default class UberMap extends Component{
    state = {
    region: null
}
    async componentDidMount() {
        Geolocation.getCurrentPosition(
            ({coords: {latitude, longitude}}) => {
                this.setState({
                    region: {
                        latitude,
                        longitude,
                        latitudeDelta: 0.0143,
                        longitudeDelta: 0.0134
                    }
                })
            },
            () => {},
            {
                timeout: 2000,
                enableHighAccuracy: true,
                maximumAge: 1000,
            }
        )
    }
    render() {
        const {region} = this.state
    return(
        <View style={{flex: 1}}>
            
            <MapView style={styles.map}
                region={region}
                showsUserLocation={true}
                loadingEnabled={true}
            />
            <Search style={styles.search}/>
        </View>
    )
}
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: 800
    },
    search: {
        maxHeight: 200
    }
})