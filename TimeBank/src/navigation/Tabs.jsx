import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Donations from "./../screens/Donations";
import Services from "./../screens/Services";


function Tabs(props) {

    const Tabs = createBottomTabNavigator();

    return <>
        <Tabs.Navigator screenOptions={{headerShown: true}} initialRouteName="MainPage">
            
            <Tabs.Screen name="MainPage" component={Services} options={{
                title: "Services",
                tabBarLabel: 'Services',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="newspaper-variant-outline" color={color} size={size} />)
                }} />

            <Tabs.Screen name="Donations" component={Donations} options={{
                headerShown: true,
                tabBarLabel: 'Donations',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account-settings-outline" color={color} size={size} />)
            }}/>

        </Tabs.Navigator>
    </>
}

export default Tabs;