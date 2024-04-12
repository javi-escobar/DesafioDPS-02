import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import DetalleTierra from './DetalleTierra';

const apiUrl = 'https://mocki.io/v1/79628377-a757-476c-82bc-184eb6de39f8';

const TierraScreen = () => {
    const [tierra, setTierra] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    useEffect(() => {

        // Obtener datos de la API

        const fetchTierra = async () => {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setTierra(data.tierra[0]);
        };

        fetchTierra();
    }, []);

    useEffect(() => {

        // Filtrar resultados basados en la búsqueda
        
        if (tierra) {
            const query = searchQuery.toLowerCase();
            const results = Object.entries(tierra)
                .filter(([key, value]) => 
                    key.toLowerCase().includes(query) || 
                    value.toString().toLowerCase().includes(query)
                )
                .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

            setFilteredResults(results);
        }
    }, [searchQuery, tierra]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Buscar..."
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
            />
            {Object.keys(filteredResults).length > 0 && (
                <DetalleTierra tierra={filteredResults} />
            )}
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
        paddingLeft: 8,
        marginBottom: 10,
    },
});

export default TierraScreen;


