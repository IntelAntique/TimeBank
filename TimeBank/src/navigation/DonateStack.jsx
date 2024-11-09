import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Donations from "../screens/Donations";
import Donate from "../screens/Donate";
import ProfileIcon from "../screens/ProfileIcon";
import Profile from "../screens/Profile";
import { StyleSheet } from "react-native";

const Stack = createStackNavigator();

function DonateStack(props) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen name="Donations" component={Donations} options={
              {...styles.header,  title: "Donations", headerRight: ProfileIcon }
            }/>
            <Stack.Screen name="Donation" component={Donate} options={
              {...styles.header, title: "Donation" }
            }/>
            <Stack.Screen name="Profile" component={Profile} options={
              {...styles.header, title: "Profile"}
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
        }
    }
})

export default DonateStack;