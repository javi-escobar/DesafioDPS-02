import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DetalleTierra = ({ tierra }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: tierra.foto }} style={styles.image} />
            <Text style={styles.title}>{tierra.nombre}</Text>
            <Text>Tipo: {tierra.tipo}</Text>
            <Text>Masa: {tierra.masa}</Text>
            <Text>Radio: {tierra.radio}</Text>
            <Text>Distancia media al sol: {tierra.distancia_media_al_sol}</Text>
            <Text>Periodo orbital: {tierra.periodo_orbital}</Text>
            <Text>Periodo de rotación: {tierra.periodo_rotacion}</Text>
            <Text>Número de lunas: {tierra.numero_de_lunas}</Text>
            <Text>Desastres naturales: {tierra.desastres_naturales.join(', ')}</Text>
            <Text>Fenómenos naturales: {tierra.fenomeno_naturales.join(', ')}</Text>
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

export default DetalleTierra;


