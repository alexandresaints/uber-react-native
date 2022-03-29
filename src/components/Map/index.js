import React, {Component, Fragment} from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { getPixelSize } from "../../utils";
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from "react-native-maps";
import Geocoder from "react-native-geocoding";

import Search from "../Search";
import Directions from "../Directions";
import Details from "../Details";

import markerImage from '../../assets/marker.png'
import backImage from '../../assets/back.png'
import { 
LocationBox,
LocationText,
LocationTimeBox,
LocationTimeText,
LocationTimeTextSmall,
Back }
from "./styles";

Geocoder.init('AIzaSyAQmiRaSeTy6PD2pJszjLt9jpwmGkFHNj8')

export default class UberMap extends Component{
    state = {
    region: null,
    destination: null,
    duration: null,
    location: null,
}
    async componentDidMount() {
        Geolocation.getCurrentPosition(
            async ({coords: {latitude, longitude}}) => {
                const response = await Geocoder.from({latitude, longitude});
                const address = response.results[0].formatted_address;
                const location = address.substring(0, address.indexOf(','))

                this.setState({
                    location,
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

    handleLocationSelected = (data, {geometry}) => {
        const {location: {lat: latitude, lng: longitude}} = geometry

        this.setState({
            destination: {
            latitude,
            longitude,
            title: data.structured_formatting.main_text,
            }
        })
    }

    handleBack = () => {
        this.setState({destination: null});
    }

    render() {
        const {region, destination, duration, location} = this.state
    return(
        <View style={{flex: 1}}>
            
            <MapView style={styles.map}
                region={region}
                showsUserLocation={true}
                loadingEnabled={true}
                ref={el => this.mapView = el}
            >
            {destination && (
            <Fragment>
                <Directions
                origin={region}
                destination={destination}
                onReady={result => {
                    // this.setState({ duration: Math.floor(result.duration) })
                    this.mapView.fitToCoordinates(result.coordinates, {
                        edgePadding: {
                            left: getPixelSize(50),
                            right: getPixelSize(50),
                            top: getPixelSize(50),
                            bottom: getPixelSize(150)
                        }
                    })
                }}
            />
            <Marker 
                coordinate={destination} 
                anchor={{x: 0, y: 0}} 
                image={markerImage}
            >
            <LocationBox>
                <LocationText>{destination.title}</LocationText>
            </LocationBox>
            </Marker>

            <Marker coordinate={region} anchor={{x: 0, y: 0}} >
            <LocationBox>
                <LocationTimeBox>
                    <LocationTimeText>50</LocationTimeText>
                    <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                </LocationTimeBox>
                <LocationText>{location}</LocationText>
            </LocationBox>
            </Marker>
        </Fragment>
        )}
            </MapView>

            {destination ? (
                <Fragment>
                    <Back onPress={this.handleBack}>
                        <Image source={backImage} />
                    </Back>
                <Details/>
                </Fragment>
            ) : ( 
                <Search onLocationSelected={this.handleLocationSelected}/>
            )}
        </View>
    )
}
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: 800
    }
})