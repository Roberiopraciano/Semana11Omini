import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Incidents from './pages/Incidents';
import Details from './pages/Details';



const AppStack = createStackNavigator();

 

export default function Routes(){
    return(
        <NavigationContainer >

          <AppStack.Navigator screenOptions={{headerShown:false}}>
           
            <AppStack.Screen name="Incident" component={Incidents}/>
            <AppStack.Screen name="Detail" component={Details} />
          </AppStack.Navigator>

        </NavigationContainer>
    )
}