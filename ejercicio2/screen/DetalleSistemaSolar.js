import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DetalleSistemaSolar = ({ route }) => {
    const { planeta } = route.params;

    return (
        <View style={styles.container}>
            <Image source={{ uri: planeta.foto }} style={styles.image} />
            <Text style={styles.title}>{planeta.nombre}</Text>
            <Text>Tipo: {planeta.tipo}</Text>
            <Text>Masa: {planeta.masa}</Text>
            <Text>Radio: {planeta.radio}</Text>
            <Text>Distancia media al sol: {planeta.distancia_media_al_sol}</Text>
            <Text>Periodo orbital: {planeta.periodo_orbital}</Text>
            <Text>Periodo de rotación: {planeta.periodo_rotacion}</Text>
            <Text>Número de lunas: {planeta.numero_de_lunas}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 5,
        marginBottom: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5,
    },
});

export default DetalleSistemaSolar;
