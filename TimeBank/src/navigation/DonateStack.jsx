import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Donations from "../screens/Donations";
import Donate from "../screens/Donate";
import AddDonation from "../screens/AddDonation";

const Stack = createStackNavigator();

function DonateStack(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Donations" component={Donations} options={{
            headerShown: true,
            title: 'Donations', // Title of the screen
            headerStyle: {
              backgroundColor: '#4361ee', // Green background color of the header
            },
            headerTintColor: 'white', // White color for the title and icons in the header
            headerTitleStyle: {
              fontWeight: 'bold', // Bold header title
            },
          }}/>
            <Stack.Screen name="Donation" component={Donate} options={{
            headerShown: true,
            title: 'Donation', // Title of the screen
            headerStyle: {
              backgroundColor: '#4361ee', // Green background color of the header
            },
            headerTintColor: 'white', // White color for the title and icons in the header
            headerTitleStyle: {
              fontWeight: 'bold', // Bold header title
            },
          }}/>
          <Stack.Screen name="Add Donation" component={AddDonation} options={{
            headerShown: true,
            title: 'Add Donation', // Title of the screen
            headerStyle: {
              backgroundColor: '#4361ee', // Green background color of the header
            },
            headerTintColor: 'white', // White color for the title and icons in the header
            headerTitleStyle: {
              fontWeight: 'bold', // Bold header title
            },
          }}/>
        </Stack.Navigator>
    );
}

export default DonateStack;