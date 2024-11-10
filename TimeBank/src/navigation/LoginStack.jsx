import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Donations from "../screens/Donations";
import { StyleSheet } from "react-native";
import Donation from "../screens/Donation";
import LoginScreen from "../screens/LoginScreen";
import Tabs from "./Tabs";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createStackNavigator();

function LoginStack(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={
              {...styles.header, title: "Login"}
            }/>
            <Stack.Screen name="Register" component={RegisterScreen} options={
              {...styles.header, title: "Register"}
            }/>
            <Stack.Screen name="Tabs" component={Tabs} options={{
              title: "Tabs",
              headerShown: false
            }}/>
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

export default LoginStack;