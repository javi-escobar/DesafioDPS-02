import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//URL de la API
const apiUrl = 'https://mocki.io/v1/79628377-a757-476c-82bc-184eb6de39f8';

const SistemaSolarScreen = () => {
    const [planetas, setPlanetas] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para la búsqueda
    const navigation = useNavigation();

    useEffect(() => {
        const fetchPlanetas = async () => {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setPlanetas(data.sistema_solar);
        };

        fetchPlanetas();
    }, []);

    // Filtra los planetas según el término de búsqueda

    const filteredPlanetas = planetas.filter(planeta =>
        planeta.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Renderiza cada elemento de la lista

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('Detalle del Sistema Solar', { planeta: item })}
        >
            <Image source={{ uri: item.foto }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.nombre}</Text>
                <Text>Tipo: {item.tipo}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {}
            <TextInput
                style={styles.searchBar}
                placeholder="Buscar planeta por nombre..."
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
            {}
            <FlatList
                data={filteredPlanetas}
                keyExtractor={(item) => item.nombre}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    searchBar: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
});

export default SistemaSolarScreen;

