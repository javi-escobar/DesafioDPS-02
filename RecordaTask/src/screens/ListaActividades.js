import React, { useEffect, useState } from "react";
import {
  Modal,
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { EditarActividadModal } from "./EditarActividadModal";
import Icon from "react-native-vector-icons/FontAwesome";
import DrawerMenu from "./DrawerMenu";

export const ListaActividades = ({ navigation }) => {
  const [actividades, setActividades] = useState([]);
  const isFocused = useIsFocused();
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);
  const [autenticado, setAutenticado] = useState(false);

  //Verifica que se haya iniciado sesión en la app para mostrar la lista de actividades
  useEffect(() => {
    const verificarAutenticacion = async () => {
      try {
        const autenticado = await AsyncStorage.getItem("autenticado");
        setAutenticado(autenticado === "true");
      } catch (error) {
        console.log(error);
      }
    };

    verificarAutenticacion();
  }, []);

  //Obtiene todas las actividades registradas en la app
  useEffect(() => {
    const obtenerActividades = async () => {
      try {
        const actividadesAlmacenadas = await AsyncStorage.getItem(
          "actividades"
        );
        if (actividadesAlmacenadas !== null) {
          setActividades(JSON.parse(actividadesAlmacenadas));
        }
      } catch (error) {
        console.error("Error al obtener actividades:", error);
      }
    };

    obtenerActividades();
  }, [isFocused, actividadSeleccionada]);

  //Método que se encargar de manejar la eliminación de una actividad
  const confirmarEliminarActividad = (id) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de eliminar a esta actividad?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => eliminarActividad(id),
          style: "destructive",
        },
      ]
    );
  };

  //Elimina la actividad del AsynStorage
  const eliminarActividad = async (id) => {
    try {
      const nuevasActividades = actividades.filter(
        (actividad) => actividad.id !== id
      );
      await AsyncStorage.setItem(
        "actividades",
        JSON.stringify(nuevasActividades)
      );
      setActividades(nuevasActividades);
    } catch (error) {
      console.error("Error al eliminar actividad:", error);
    }
  };

  //Maneja la edicación de actividades
  const handleEditarActividad = (actividad) => {
    setActividadSeleccionada(actividad);
  };

  //Actualiza la actividad editada en el AsynStorage
  const handleSaveEdicion = async (actividadEditada) => {
    try {
      const nuevasActividades = actividades.map((actividad) =>
        actividad.id === actividadEditada.id ? actividadEditada : actividad
      );
      await AsyncStorage.setItem(
        "actividades",
        JSON.stringify(nuevasActividades)
      );
      setActividades(nuevasActividades);
      setActividadSeleccionada(null);
    } catch (error) {
      console.error("Error al editar actividad:", error);
    }
  };

  //Maneja la navegación del boton flotante
  const handleAgregarActividades = () => {
    navigation.navigate("Registrar Actividad");
  };

  //Método para mostrar las actividades guardadas en el AsyncStorage
  const renderActividad = ({ item }) => {
    // Parsea la cadena de fecha para extraer día, mes y año
    const [, dia, mes, ano] = item.fecha.match(/(\d+) de (\w+) de (\d+)/);

    // Convierte el mes a número usando el nombre del mes
    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    const mesNumero = meses.findIndex((m) => m === mes.toLowerCase()) + 1;

    // Crear objeto Date con el día, mes y año obtenidos
    const fechaEntrega = new Date(ano, mesNumero - 1, dia);
    const fechaActual = new Date();
    const diferenciaTiempo = fechaEntrega - fechaActual;
    const diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));

    let color;
    if (diferenciaDias < 0) {
      color = "#c25848"; // Rojo (Ya paso la fecha)
    } else if (diferenciaDias === 0) {
      color = "#648a64"; // Verde (La entrega es hoy)
    } else {
      color = "#61a6ab"; // Azul (Faltan días)
    }

    return (
      <View style={[styles.actividadContainer, { backgroundColor: color }]}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.subtext}>Lugar: {item.lugar}</Text>
        <Text style={styles.subtext}>Descripción: {item.descripcion}</Text>
        <Text style={styles.subtext}>Hora: {item.hora}</Text>
        <Text style={styles.subtext}>Fecha: {item.fecha}</Text>
        <View style={styles.botonesContainer}>
          <Icon
            name="edit"
            style={[styles.btnIcon, styles.editarBtn]}
            onPress={() => handleEditarActividad(item)}
          />

          <Icon
            name="trash"
            style={[styles.btnIcon, styles.eliminarBtn]}
            onPress={() => confirmarEliminarActividad(item.id)}
          />
        </View>
      </View>
    );
  };

  //Si el usuario no ha iniciado sesión muestra un mensaje
  if (!autenticado) {
    return (
      <View style={styles.vacio}>
        <Text style={styles.txtVacio}>
          Inicia sesión para agregar actividades
        </Text>
        <Icon name="frown-o" style={styles.iconVacio} />
      </View>
    );
    //Si el usuario ha iniciado sesión muestra todas las actividades registradas
  } else if(autenticado) {
    return (
      <>
        <View style={styles.container}>
          <EditarActividadModal
            visible={actividadSeleccionada !== null}
            actividad={actividadSeleccionada}
            onSave={handleSaveEdicion}
            onCancel={() => setActividadSeleccionada(null)}
          />
          {actividades.length > 0 ? (
            //Si no hay actividades registradas en el AsyncStorage muestra un mensaje, si hay actividades las renderiza
            <FlatList
              data={actividades}
              renderItem={renderActividad}
              keyExtractor={(item) => item.id}
            />
          ) : (
            //Mensaje e icono para cuando no hay actividades registradas
            <View style={styles.vacio}>
              <Text style={styles.txtVacio}>
                No hay actividades registradas
              </Text>
              <Icon name="frown-o" style={styles.iconVacio} />
            </View>
          )}
          <TouchableHighlight
            style={styles.btnFlotante}
            onPress={handleAgregarActividades}
          >
            <Text style={styles.btnText}>+</Text>
          </TouchableHighlight>
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1e3ac",
    padding: 20,
  },
  actividadContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#213435",
    marginBottom: 10,
  },
  subtext: {
    fontSize: 18,
    marginBottom: 5,
    color: "#213435",
    fontWeight: "bold",
  },
  btnText: {
    color: "#fff",
    fontSize: 20,
  },
  btnFlotante: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#09456c",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  editarBtn: {
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
  eliminarBtn: {
    backgroundColor: "#ba3622",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    minWidth: 100,
    width: "48%",
  },
  botonesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  btnIcon: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
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
});

export default ListaActividades;
