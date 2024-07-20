import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screen/HomeScreen';
import DetailsScreen from './screen/DetailsScreen';
import CartScreen from './screen/CartScreen';
import { Pizza } from './screen/src/type';
import { Ionicons } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [cartItems, setCartItems] = useState<Pizza[]>([]);

  const addToCart = (pizza: Pizza) => {
    const existingPizza = cartItems.find((item) => item.id === pizza.id);
    if (existingPizza) {
      setCartItems(
        cartItems.map((item) =>
          item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...pizza, quantity: 1 }]);
    }
  };

  const HomeStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home">
        {(props) => <HomeScreen {...props} addToCart={addToCart} />}
      </Stack.Screen>
      <Stack.Screen name="Details">
        {(props) => <DetailsScreen {...props} addToCart={addToCart} />}
      </Stack.Screen>
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Cart') {
              iconName = 'cart';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}

      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Cart">
          {(props) => <CartScreen {...props} cartItems={cartItems} />}

        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
