import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Pizza } from './src/type';

interface CartScreenProps {
    cartItems: Pizza[];
}

const CartScreen: React.FC<CartScreenProps> = ({ cartItems }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Cart</Text>
            <Text style={styles.subHeader}>Total Items: {cartItems.length}</Text>
            <FlatList
                data={cartItems}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => navigation.navigate('Details', { pizza: item })}
                    >
                        <Text style={styles.itemText}>{item.name} - Quantity: {item.quantity}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
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
    subHeader: {
        fontSize: 18,
        marginBottom: 16,
        textAlign: 'center',
        color: '#666',
    },
    itemContainer: {
        padding: 16,
        marginBottom: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    itemText: {
        fontSize: 16,
        color: '#444',
    },
});

export default CartScreen;
