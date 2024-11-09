import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Donations from "../screens/Donations";
import Donate from "../screens/Donate";

const Stack = createStackNavigator();

function DonateStack(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Donations" component={Donations} options={{ headerShown: true }}/>
            <Stack.Screen name="Donation" component={Donate} options={{ headerShown: true }}/>
        </Stack.Navigator>
    );
}

export default DonateStack;