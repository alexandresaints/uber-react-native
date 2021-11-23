import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import MapView from "react-native-maps";

const HomeScreen = () => {
    return(
        <SafeAreaView style={{flex: 1}}>
            <MapView style={styles.map}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    map: {
        width: 400,
        height: 1000
    }
})
export default HomeScreen