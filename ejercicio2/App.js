import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SistemaSolarScreen from './screen/SistemaSolarScreen';
import DetalleSistemaSolar from './screen/DetalleSistemaSolar';
import TierraScreen from './screen/TierraScreen';
import DetalleTierra from './screen/DetalleTierra';
import SolScreen from './screen/SolScreen';
import DetalleSol from './screen/DetalleSol';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// navegación en Sistema Solar
const SistemaSolarStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Planetas" component={SistemaSolarScreen} />
            <Stack.Screen name="Detalle del Sistema Solar" component={DetalleSistemaSolar} />
        </Stack.Navigator>
    );
};

// navegación en Tierra

const TierraStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Planeta Tierra" component={TierraScreen} />
            <Stack.Screen name="DetalleTierra" component={DetalleTierra} />
        </Stack.Navigator>
    );
};

const SolStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Estrella Solar" component={SolScreen} />
            <Stack.Screen name="DetalleSol" component={DetalleSol} />
        </Stack.Navigator>
    );
};


// menú de pestañas inferiores

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Sistema Solar") {
                        iconName = focused ? "planet" : "planet-outline";
                    } else if (route.name === "Tierra") {
                        iconName = focused ? "globe" : "globe-outline";
                    } else if (route.name === "Sol") {
                        iconName = focused ? "sunny" : "sunny-outline";
                    }

                    
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
               
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                    display: "flex",
                },
            })}
        >
            <Tab.Screen name="Sistema Solar" component={SistemaSolarStack} />
            <Tab.Screen name="Tierra" component={TierraStack} />
            <Tab.Screen name="Sol" component={SolStack} />
        </Tab.Navigator>
    );
};


const App = () => {
    return (
        <NavigationContainer>
            <BottomTabNavigator />
        </NavigationContainer>
    );
};

export default App;

