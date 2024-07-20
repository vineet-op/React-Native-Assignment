import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Pizza } from './src/type';

type RootStackParamList = {
    Details: { pizza: Pizza };
};

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface DetailsScreenProps {
    addToCart: (pizza: Pizza) => void;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ addToCart }) => {
    const route = useRoute<DetailsScreenRouteProp>();
    const navigation = useNavigation();
    const { pizza } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Details</Text>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{pizza.name}</Text>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.value}>{pizza.description}</Text>
            <Text style={styles.label}>Price:</Text>
            <Text style={styles.value}>{pizza.price}</Text>
            <Button title="Add to Cart" onPress={() => addToCart(pizza)} />
            <View style={styles.buttonSpacer} />
            <Button title="Go Back" onPress={() => navigation.goBack()} />
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
    label: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 16,
        color: '#555',
    },
    value: {
        fontSize: 16,
        marginBottom: 8,
        color: '#777',
    },

    buttonSpacer: {
        marginVertical: 8,
    }
});

export default DetailsScreen;
