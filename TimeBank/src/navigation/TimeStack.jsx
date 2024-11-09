import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Service from "../screens/Service";
import Services from "../screens/Services";

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
          }}/>
        <TimeBankStack.Screen name="Service" component={Service}
        options={{
            title: 'Services', // Title of the screen
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