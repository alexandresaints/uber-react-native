import React from 'react';
import MapViewDirections from 'react-native-maps-directions'

const Directions = ({destination, origin, onReady}) => ( 
    <MapViewDirections
        destination={destination}
        origin={origin}
        onReady={onReady}
        apikey='AIzaSyAQmiRaSeTy6PD2pJszjLt9jpwmGkFHNj8'
        strokeWidth={5}
        strokeColor='#222'
    />
);

export default Directions