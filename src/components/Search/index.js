import React, {Component} from 'react';
import { View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class Search extends Component {
    render(){
        return(
        <View style={{maxHeight: 200}}>
         <GooglePlacesAutocomplete
            placeholder="Para onde?"
            placeholderTextColor='#333'
            onPress={(data, details) => {
                console.log(data, details)
            }}
            query={{
                key: 'AIzaSyAQmiRaSeTy6PD2pJszjLt9jpwmGkFHNj8',
                language: 'pt-br'
            }}
            textInputProps={{
                autoCapitalize: 'none',
                autoCorrect: false
            }}
            fetchDetails={true}
            enablePoweredByContainer={false}
            styles={{listView: {
                color: 'black', //To see where exactly the list is
                zIndex: 2, //To popover the component outwards
                position: 'absolute',
                top: 42
              },}}
        />
        </View>
        )}
}