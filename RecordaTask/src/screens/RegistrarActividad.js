import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import shortid from "react-id-generator";
import DrawerMenu from "./DrawerMenu";

export const RegistrarActividad = ({ navigation }) => {
  const [titulo, setTitulo] = useState("");
  const [lugar, setLugar] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [hora, setHora] = useState("");
  const [fecha, setFecha] = useState("");

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [autenticado, setAutenticado] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmarFecha = (date) => {
    const opciones = { year: "numeric", month: "long", day: "2-digit" };
    setFecha(date.toLocaleDateString("es-ES", opciones));
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmarHora = (hora) => {
    const opciones = { hour: "numeric", minute: "2-digit", hour12: false };
    setHora(hora.toLocaleString("es-ES", opciones));
    hideTimePicker();
  };

  useEffect(() => {
    const verificarAutenticacion = async () => {
      try {
        // Verifica si el usuario ha iniciado sesión en la app
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

  //Método para crear una nueva actividad
  const crearNuevaActividad = async () => {
    if (
      titulo.trim() === "" ||
      lugar.trim() === "" ||
      descripcion.trim() === "" ||
      hora.trim() === "" ||
      fecha.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios");
      return;
    }

    const nuevaActividad = {
      id: shortid(),
      titulo,
      lugar,
      descripcion,
      hora,
      fecha,
    };

    const actividadesAlmacenadas = await AsyncStorage.getItem("actividades");
    const actividades = actividadesAlmacenadas
      ? JSON.parse(actividadesAlmacenadas)
      : [];

    const nuevasActividades = [...actividades, nuevaActividad];

    await AsyncStorage.setItem(
      "actividades",
      JSON.stringify(nuevasActividades)
    );
    //Mensaje de confirmación
    Alert.alert("Actividad", "Actividad Registrada", [{ text: "OK" }]);

    setTitulo("");
    setLugar("");
    setDescripcion("");
    setHora("");
    setFecha("");
    //Redirección a la pantalla Lista de Actividades para confirmar el registro de una actividad
    navigation.navigate("Lista de Actividades");
  };

  const mostrarAlerta = (mensaje) => {
    Alert.alert("Error", mensaje, [{ text: "OK" }]);
  };

  //Si el usuario no ha iniciado sesión muestra el siguiente mensaje y un botón que redirige a la pantalla de Login
  if (!autenticado) {
    return (
      <View style={styles.vacio}>
        <Text style={styles.txtVacio}>
          No has iniciado sesión. Por favor, inicia sesión para continuar.
        </Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.btnText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    );
  } //Si el usuario ha iniciado sesión muestra la pantalla con normalidad 
  else {
    return (
      <>
        <ScrollView style={styles.container}>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Actividad:</Text>
              <TextInput
                style={styles.input}
                value={titulo}
                onChangeText={(texto) => setTitulo(texto)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Lugar:</Text>
              <TextInput
                style={styles.input}
                value={lugar}
                onChangeText={(texto) => setLugar(texto)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Descripción:</Text>
              <TextInput
                style={styles.input}
                value={descripcion}
                onChangeText={(texto) => setDescripcion(texto)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Hora:</Text>
              <Button title="Seleccionar Hora" onPress={showTimePicker} />
              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={confirmarHora}
                onCancel={hideTimePicker}
                locale="es_ES"
                headerTextIOS="Elige una Hora"
                cancelTextIOS="Cancelar"
                confirmTextIOS="Confirmar"
              />
              <Text style={styles.text}>{hora}</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Fecha:</Text>
              <Button title="Seleccionar Fecha" onPress={showDatePicker} />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={confirmarFecha}
                onCancel={hideDatePicker}
                locale="es_ES"
                headerTextIOS="Elige la Fecha"
                cancelTextIOS="Cancelar"
                confirmTextIOS="Confirmar"
              />
              <Text style={styles.text}>{fecha}</Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={crearNuevaActividad}
            >
              <Text style={styles.buttonText}>Guardar Actividad</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a6b985",
    padding: 20,
  },
  form: {
    backgroundColor: "#e1e3ac",
    padding: 20,
    borderRadius: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#213435",
  },
  input: {
    height: 40,
    borderColor: "#030303",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 22,
  },
  button: {
    backgroundColor: "#09456c",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    marginTop: 5,
    fontSize: 22,
    color: "#213435",
  },
  txtVacio: {
    fontSize: 24,
    textAlign: "center",
  },
  iconVacio: {
    fontSize: 50,
    color: "#ba3622",
  },
  vacio: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 20,
  },
  btn: {
    backgroundColor: "#46685b",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    minWidth: 100,
    width: "48%",
  },
});
