import { createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {FontAwesome, Ionicons} from "@expo/vector-icons";

import MainScreen from "./MainScreen";
import InformScreen from "./InformScreen";
import ScheduleScreen from "./ScheduleScreen";

import { AppRegistry, Platform } from 'react-native';
import App from './App';

AppRegistry.registerComponent('main', () => App);

// if (Platform.OS === 'web') {
//     const rootTag = document.getElementById('root') || document.getElementById('main');
//     AppRegistry.runApplication('main', { rootTag });
// }

const Stack = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false}}>
                <Stack.Screen 
                    name="Inform" 
                    component={InformScreen}
                    options={{ tabBarIcon: ({ focused, color, size }) => null }}

                />
                <Stack.Screen 
                    name="Home" 
                    component={MainScreen}
                    options={{ tabBarIcon: ({ focused, color, size }) => null }}
                />
                <Stack.Screen 
                    name="Schedule" 
                    component={ScheduleScreen}
                    options={{ tabBarIcon: ({ focused, color, size }) => null }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}