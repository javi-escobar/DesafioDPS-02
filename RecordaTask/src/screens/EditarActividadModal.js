import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  ScrollView,
  Modal,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Modal para la edición de una actividad
export const EditarActividadModal = ({
  visible,
  actividad, //Recibe la actividad seleccionada como parametro
  onSave,
  onCancel, //Estado del modal
}) => {
  const [titulo, setTitulo] = useState("");
  const [lugar, setLugar] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [hora, setHora] = useState("");
  const [fecha, setFecha] = useState("");

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  //Asigna los valores de la actividad seleccionada a los campos
  useEffect(() => {
    if (actividad) {
      setTitulo(actividad.titulo);
      setLugar(actividad.lugar);
      setDescripcion(actividad.descripcion);
      setHora(actividad.hora);
      setFecha(actividad.fecha);
    }
  }, [actividad]);

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

  //Método que maneja los datos editados
  const handleSave = () => {
    const actividadEditada = {
      ...actividad,
      titulo,
      lugar,
      descripcion,
      hora,
      fecha,
    };
    onSave(actividadEditada);
  };

  return (
    <Modal visible={visible} animationType="slide">
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
          <TouchableHighlight
            style={styles.btn}
            onPress={() => handleSave()}
          >
            <Text style={styles.btnText}>Guardar Actividad</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.button, styles.btnCancelar]}
            onPress={onCancel}
          >
            <Text style={styles.btnText}>Cancelar</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </Modal>
  );
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
  btn: {
    backgroundColor: "#46685b",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  btnText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  btnCancelar: {
    backgroundColor: "#ba3622",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    marginTop: 5,
    fontSize: 22,
    color: "#213435",
  },
});
