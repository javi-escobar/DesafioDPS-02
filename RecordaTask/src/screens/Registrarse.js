import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import shortid from "react-id-generator";

export const Registrarse = ({navigation}) => {
  const [usuario, setUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [passoword, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const crearNuevoLogin = async () => {
    if (
      usuario.trim() === "" ||
      correo.trim() === "" ||
      passoword.trim() === "" ||
      password2.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios");
      return;
    }

    if (passoword !== password2) {
      mostrarAlerta("Las contraseñas no coinciden");
      return;
    }

    //Obtiene los registros de logins agregados al AsyncStorage
    const loginsAlmacenados = await AsyncStorage.getItem("logins");
    const logins = loginsAlmacenados ? JSON.parse(loginsAlmacenados) : [];


    // Verifica si el correo ya está registrado
    const correoExistente = logins.some((login) => login.correo === correo);
    if (correoExistente) {
      mostrarAlerta("El correo electrónico ya está registrado");
      return;
    }

    // Crea un nuevo usuario
    const nuevoLogin = {
      id: shortid(),
      usuario,
      correo,
      passoword,
    };

    //Arreglo de logins del AsyncStorage
    const nuevosLogins = [...logins, nuevoLogin];
    //Crea los logins para AsyncStorage
    await AsyncStorage.setItem("logins", JSON.stringify(nuevosLogins))
    //Mensaje de confirmación de registro correcto
    Alert.alert("Registrado","¡Registro exitoso!", [{text: "OK"}]);
    navigation.navigate("Login");
    //Vaciá los campos del form
    setUsuario("");
    setCorreo("");
    setPassword("");
    setPassword2("");
  };
  //Función que maneja los mensajes de alerta
  const mostrarAlerta = (mensaje) => {
    Alert.alert("Error", mensaje, [{ text: "OK" }]);
  };

  return (
    <>
      <ScrollView style={styles.form}>
        <View>
          <Text style={styles.label}>Usuario:</Text>
          <TextInput
            style={styles.input}
            value={usuario}
            onChangeText={(texto) => setUsuario(texto)}
          ></TextInput>
        </View>
        <View>
          <Text style={styles.label}>Correo:</Text>
          <TextInput
            style={styles.input}
            value={correo}
            onChangeText={(texto) => setCorreo(texto)}
            keyboardType="email-address"
          ></TextInput>
        </View>
        <View>
          <Text style={styles.label}>Contraseña:</Text>
          <TextInput
            style={styles.input}
            value={passoword}
            onChangeText={(texto) => setPassword(texto)}
            secureTextEntry={true}
          ></TextInput>
        </View>
        <View>
          <Text style={styles.label}>Repetir Contraseña:</Text>
          <TextInput
            style={styles.input}
            value={password2}
            onChangeText={(texto) => setPassword2(texto)}
            secureTextEntry={true}
          ></TextInput>
        </View>
        <View>
          <TouchableHighlight
            style={styles.btn}
            onPress={() => crearNuevoLogin()}
          >
            <Text style={styles.btnText}>Registrarse</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: "#FFF",
    paddingHorizontal: 25,
    paddingVertical: 8,
    flex: 1,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 25,
    fontSize: 22,
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
