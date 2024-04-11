import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Login = ({ navigation }) => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const usuariosRegistrados = await AsyncStorage.getItem("logins");
      if (usuariosRegistrados) {
        const logins = JSON.parse(usuariosRegistrados);
        //Método que maneja el Login, busca registros en el AsyncStorage, se puede usar el nombre de usuario o el correo
        const usuarioEncontrado = logins.find(
          (login) => (login.usuario === usuario || login.correo === usuario) && login.passoword === password
        );

        if (usuarioEncontrado) {
          // Guarda el estado de autenticación en AsyncStorage
          await AsyncStorage.setItem("autenticado", "true");

          // Vacia los campos de usuario y contraseña
          setUsuario("");
          setPassword("");

          // Redirigir a la lista de actividades
          navigation.navigate("Lista de Actividades");

          // Actualiza el estado de autenticación en App.js
          onLogin(true);
        } else {
          Alert.alert("Error", "Credenciales Incorrectas", [{ text: "OK" }]);
        }
      } else {
        Alert.alert("Error", "No hay usuarios registrados", [{ text: "OK" }]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //Redirección a la pantalla de Registrarse
  const handleRegistrarse = () => {
    navigation.navigate("Registrarse");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Usuario/Correo:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(texto) => setUsuario(texto)}
        keyboardType="email-address"
        value={usuario}
      />
      <Text style={styles.label}>Contraseña:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(texto) => setPassword(texto)}
        secureTextEntry={true}
        value={password}
      />
      <TouchableHighlight style={styles.btn} onPress={() => handleLogin()}>
        <Text style={styles.btnText}>Iniciar Sesión</Text>
      </TouchableHighlight>
      <Text style={styles.text}>
        ¿No posee una cuenta?{" "}
        <Text style={styles.link} onPress={handleRegistrarse}>
          Registrarse
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 22,
    marginTop: 25,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: "#030303",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 8,
    borderRadius: 10,
    fontSize: 22,
  },
  text: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 22,
  },
  link: {
    color: "#4595E5",
  },
  btn: {
    padding: 10,
    backgroundColor: "#4595E5",
    marginVertical: 20,
    borderRadius: 5,
  },
  btnText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
});
