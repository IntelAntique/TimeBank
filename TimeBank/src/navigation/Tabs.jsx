import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Services from "./../screens/Services";
import TimeStack from "./TimeStack";
import DonateStack from "./DonateStack";
import SignedUpStack from "./SignedUpStack";

function Tabs(props) {

    const Tabs = createBottomTabNavigator();

    return <>
        <Tabs.Navigator screenOptions={{
                headerShown: false,
                backgroundColor: 'blue',
                tabBarActiveTintColor: '#4361ee'
                }} initialRouteName="MainPage">
            
            <Tabs.Screen name="MainPage" component={TimeStack} options={{
                title: "Services",
                tabBarLabel: () => null,
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="tools" color={color} size={size} />)
                }} />

            <Tabs.Screen name="DonateStack" component={DonateStack} options={{
                headerShown: false,
                tabBarLabel: () => null,
                headerStyle: {
                    backgroundColor: '#4361ee', // Green background color of the header
                },
                headerTintColor: 'white', // White color for the title and icons in the header
                headerTitleStyle: {
                fontWeight: 'bold', // Bold header title
                },
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="gift" color={color} size={size} />)
            }}/>

        <Tabs.Screen name="SignedUpStack" component={SignedUpStack} options={{
                headerShown: false,
                tabBarLabel: () => null,
                headerStyle: {
                    backgroundColor: '#4361ee', // Green background color of the header
                },
                headerTintColor: 'white', // White color for the title and icons in the header
                headerTitleStyle: {
                fontWeight: 'bold', // Bold header title
                },
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="calendar" color={color} size={size} />)
            }}/>

        </Tabs.Navigator>
    </>
}

export default Tabs;