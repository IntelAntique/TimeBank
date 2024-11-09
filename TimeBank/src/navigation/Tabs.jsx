import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Donations from "./../screens/Donations";
import Services from "./../screens/Services";
import TimeStack from "./TimeStack";


function Tabs(props) {

    const Tabs = createBottomTabNavigator();

    return <>
        <Tabs.Navigator screenOptions={{
                headerShown: true,
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

            <Tabs.Screen name="Donations" component={Donations} options={{
                headerShown: true,
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

        </Tabs.Navigator>
    </>
}

export default Tabs;