import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DetalleSol = ({ sol }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: sol.foto }} style={styles.image} />
            <Text style={styles.title}>{sol.nombre}</Text>
            <Text>Tipo: {sol.tipo}</Text>
            <Text>Masa: {sol.masa}</Text>
            <Text>Radio: {sol.radio}</Text>
            <Text>Distancia al centro de la Vía Láctea: {sol.distancia_al_centro_via_lactea}</Text>
            <Text>Edad: {sol.edad}</Text>
            <Text>Temperatura superficial: {sol.temperatura_superficial} °C</Text>
            <Text>Composición: {sol.composicion}</Text>
            <Text>Actividad solar: {sol.actividad_solar.join(', ')}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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

export default DetalleSol;

