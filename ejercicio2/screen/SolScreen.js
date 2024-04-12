import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
import DetalleSol from './DetalleSol';

const apiUrl = 'https://mocki.io/v1/79628377-a757-476c-82bc-184eb6de39f8';

const SolScreen = () => {
    const [sol, setSol] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    useEffect(() => {

        // Obtener datos de la API

        const fetchSol = async () => {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setSol(data.sol[0]); 
        };

        fetchSol();
    }, []);

    useEffect(() => {

        // Filtrar resultados basados en la búsqueda
        
        if (sol) {
            const query = searchQuery.toLowerCase();
            const results = Object.entries(sol)
                .filter(([key, value]) => 
                    key.toLowerCase().includes(query) || 
                    value.toString().toLowerCase().includes(query)
                )
                .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

            setFilteredResults(results);
        }
    }, [searchQuery, sol]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Buscar..."
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
            />
            {Object.keys(filteredResults).length > 0 && (
                <DetalleSol sol={filteredResults} />
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

export default SolScreen;

