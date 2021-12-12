import 'react-native-gesture-handler';
import React from 'react';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Detail from './screens/Detail';


const Stack = createStackNavigator();

const App = () => {
 
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};

export default App;
