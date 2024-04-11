import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Login } from "./src/screens/Login";
import { Registrarse } from "./src/screens/Registrarse";
import { RegistrarActividad } from "./src/screens/RegistrarActividad";
import { ListaActividades } from "./src/screens/ListaActividades";
import DrawerMenu from "./src/screens/DrawerMenu";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const verificarAutenticacion = async () => {
      try {
        // Verificar si el usuario está autenticado en AsyncStorage
        const autenticado = await AsyncStorage.getItem("autenticado");
        if (autenticado === "true") {
          setAutenticado(true);
        } else {
          setAutenticado(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    verificarAutenticacion();
  }, []);

  const handleLogin = async () => {
    // Cambiar el estado de autenticado a verdadero
    setAutenticado(true);
    // Guardar el estado de autenticación en AsyncStorage
    await AsyncStorage.setItem("autenticado", "true");
  };

  const handleLogout = async () => {
    // Cambiar el estado de autenticado a falso
    setAutenticado(false);
    // Eliminar el estado de autenticación de AsyncStorage
    await AsyncStorage.removeItem("autenticado");
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => (
          <DrawerMenu
            onLogin={handleLogin}
            onLogout={handleLogout}
            {...props}
          />
        )}
      >
        <Drawer.Screen name="RecordaTask" component={MainStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false, title: "" }}
      />
      <Stack.Screen
        name="Registrarse"
        component={Registrarse}
        options={{
          title: "Registro",
          headerStyle: { backgroundColor: "#648a64" },
          headerTintColor: "#FFF",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Stack.Screen
        name="Lista de Actividades"
        component={ListaActividades}
        options={{
          title: "Lista de Actividades",
          headerStyle: { backgroundColor: "#648a64" },
          headerTintColor: "#FFF",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Stack.Screen
        name="Registrar Actividad"
        component={RegistrarActividad}
        options={{
          title: "Registrar Actividad",
          headerStyle: { backgroundColor: "#648a64" },
          headerTintColor: "#FFF",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
    </Stack.Navigator>
  );
};

export default App;
