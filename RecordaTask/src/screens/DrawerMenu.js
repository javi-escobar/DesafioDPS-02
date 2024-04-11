import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
//Menu Drawer

const DrawerMenu = ({ navigation, onLogout }) => {
  //Método para confirmar el cierre de la sesión
  const confirmarCerrarSesion = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Salir",
          onPress: () => {
            // Cambiar el estado de autenticado a falso
            onLogout();
            // Redirige a la pantalla de inicio de sesión
            navigation.navigate("Login");
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };
  //Navegación Drawer
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Registrar Actividad")}
      >
        <Text style={styles.text}>Agregar Actividad</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={confirmarCerrarSesion}>
        <Text style={styles.text}>Cerrar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Lista de Actividades")}
      >
        <Text style={styles.text}></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  item: {
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
  },
});

export default DrawerMenu;
