import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import ProfileIcon from "../screens/ProfileIcon";
import { StyleSheet } from "react-native";
import SignedUp from "../screens/SignedUp";
import Completed from "../screens/Completed";
import { Ionicons } from 'react-native-vector-icons'; // Import the icon library

const Stack = createStackNavigator();

function SignedUpStack(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SignedUp" component={SignedUp} options={
              {...styles.header, title: "Signed Up", headerLeft: () => null, headerRight: ProfileIcon }}
                />
            <Stack.Screen name="Completed" component={Completed} options={
              {...styles.header, title: "Completed"}
            }/>
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    header: {
        headerStyle: {
          backgroundColor: '#4361ee', // Green background color of the header
        },
        headerTintColor: 'white', // White color for the title and icons in the header
        headerTitleStyle: {
          fontWeight: 'bold', // Bold header title
        }, 
    }
})

export default SignedUpStack;