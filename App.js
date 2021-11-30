import React from 'react';
import {SafeAreaView} from 'react-native';
import UberMap from './src/components/Map';
import Route from './src/routes';

const App = () => {
  return(
    <SafeAreaView>
      <Route/>
    </SafeAreaView>
  )
}

export default App;
