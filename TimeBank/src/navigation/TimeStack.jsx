import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Service from "../screens/Service";
import Services from "../screens/Services";
import AddService from "../screens/AddService";
import { Ionicons } from 'react-native-vector-icons'; // Import the icon library
import ProfileIcon from "../screens/ProfileIcon";
import Profile from "../screens/Profile";

const TimeBankStack = createNativeStackNavigator();

function TimeStack(props) {
    
    return (
    <TimeBankStack.Navigator>
        <TimeBankStack.Screen name="Services" component={Services}
        options={{
            title: 'Services', // Title of the screen
            headerStyle: {
              backgroundColor: '#4361ee', // Green background color of the header
            },
            headerTintColor: 'white', // White color for the title and icons in the header
            headerTitleStyle: {
              fontWeight: 'bold', // Bold header title
            },
            headerLeft: () => null,
            headerRight: ProfileIcon }}
              />
        <TimeBankStack.Screen name="Service" component={Service}
        options={{
            title: 'Service', // Title of the screen
            headerStyle: {
              backgroundColor: '#4361ee', // Green background color of the header
            },
            headerTintColor: 'white', // White color for the title and icons in the header
            headerTitleStyle: {
              fontWeight: 'bold', // Bold header title
            },
          }}/>
          <TimeBankStack.Screen name="AddService" component={AddService}
        options={{
            title: 'Add Service', // Title of the screen
            headerStyle: {
              backgroundColor: '#4361ee', // Green background color of the header
            },
            headerTintColor: 'white', // White color for the title and icons in the header
            headerTitleStyle: {
              fontWeight: 'bold', // Bold header title
            },
          }}/>
          <TimeBankStack.Screen name="Profile" component={Profile} options={{
            title: 'Profile', // Title of the screen
            headerStyle: {
              backgroundColor: '#4361ee', // Green background color of the header
            },
            headerTintColor: 'white', // White color for the title and icons in the header
            headerTitleStyle: {
              fontWeight: 'bold', // Bold header title
            },
          }}/>
    </TimeBankStack.Navigator>);
}

export default TimeStack;