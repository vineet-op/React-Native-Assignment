import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Pizza } from './src/type';

interface HomeScreenProps {
    addToCart: (pizza: Pizza) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ addToCart }) => {
    const [pizzas, setPizzas] = useState<Pizza[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        const fetchPizzas = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("https://private-anon-b26f96742a-pizzaapp.apiary-mock.com/restaurants/1/menu?category=Pizza&orderBy=rank");
                const data = await response.json();
                setPizzas(data);
            } catch (error) {
                console.error("Error fetching pizzas:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPizzas();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Pizza Listing</Text>
            {isLoading ? (
                <Text style={styles.loadingText}>Loading pizzas...</Text>
            ) : (
                <View style={styles.pizzaList}>
                    {pizzas.map((pizza) => (
                        <View key={pizza.id} style={styles.pizzaItem}>
                            <Text style={styles.pizzaName}>Name: {pizza.name}</Text>
                            <Button
                                title="View Details"
                                onPress={() => navigation.navigate('Details', { pizza })}
                            />
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: 'center',
        color: '#333',
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#999',
    },
    pizzaList: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    pizzaItem: {
        width: '90%',
        padding: 16,
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    pizzaName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#555',
    },
});

export default HomeScreen;
