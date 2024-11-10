import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Service from "../screens/Service";
import Services from "../screens/Services";
import AddService from "../screens/AddService";
import { Ionicons } from 'react-native-vector-icons'; // Import the icon library

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
            headerRight: () => (
              <Ionicons 
                  name="person-circle-outline" // This is the profile icon
                  size={30} // Set the size of the icon
                  color="white" // Icon color
                  marginRight={-5}
                  onPress={() => {
                      // Handle profile icon press (e.g., navigate to profile screen)
                      console.log('Profile Icon Pressed');
                  }}
              />
          )
          }}/>
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
    </TimeBankStack.Navigator>);
}

export default TimeStack;