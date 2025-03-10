import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { useRouter } from 'expo-router';
import { Swipeable } from 'react-native-gesture-handler';

import BackIcon from '@/assets/svg/backIcon';
import MyCartItem from '@/components/MyCartItem';
import BuyIconWhite from '@/assets/svg/buyIconWhite';
import TrashIcon from '@/assets/svg/trashIcon';

import { format } from 'date-fns';
import { useProfile } from '@/contexts/ProfileContext';
interface CartItem {
  price: number;
  [key: string]: any; // Allow for other properties
}

interface ProfileData {
  address: string;
  [key: string]: any; // Allow for other properties like name, phone, etc.
}

export default function MyCart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItem, setTotalItem] = useState(0);
    const router = useRouter();

    const { profile, setProfile } = useProfile();

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        try {
            const fileUri = FileSystem.documentDirectory + 'my-cart.txt';
            const fileExists = await FileSystem.getInfoAsync(fileUri);
    
            if (fileExists.exists) {
                const content = await FileSystem.readAsStringAsync(fileUri);
                const parsedCart = JSON.parse(content);
                setCartItems(parsedCart);
    
                // Calculate total price
                const total = parsedCart.reduce(
                  (sum: number, item: CartItem) => sum + Number(item.price), 0
                );
                setTotalPrice(total);
    
                // Calculate total item
                const cnt = parsedCart.reduce(
                    (sum: number, item: CartItem) => sum + Number(item.count), 0
                );
                setTotalItem(cnt);
            } else {
                // If file doesn't exist, create it with an empty array
                await FileSystem.writeAsStringAsync(
                    fileUri,
                    JSON.stringify([]),
                    { encoding: FileSystem.EncodingType.UTF8 }
                );
                setCartItems([]);
                setTotalPrice(0);
                setTotalItem(0);
            }
        } catch (error) {
            console.error('Error loading cart:', error);
            // Initialize with empty values in case of error
            setCartItems([]);
            setTotalPrice(0);
            setTotalItem(0);
        }
    };

    const deleteItem = async (index: number) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);

        // Update the total price
        const total = updatedCartItems.reduce(
          (sum: number, item: CartItem) => sum + Number(item.price), 0
        );
        setTotalPrice(total);

        // update total item
        const cnt = updatedCartItems.reduce(
            (sum: number, item: CartItem) => sum + Number(item.count), 0
        );
        setTotalItem(cnt);

        // Save the updated cart to the file
        await saveCartToFile(updatedCartItems);
    };

    const saveCartToFile = async (cartData: CartItem[]) => {
        try {
            const fileUri = FileSystem.documentDirectory + 'my-cart.txt';
            await FileSystem.writeAsStringAsync(
                fileUri, 
                JSON.stringify(cartData), 
                { encoding: FileSystem.EncodingType.UTF8 }
            );
        } catch (error) {
            console.error('Error saving cart:', error);
            Alert.alert('Error', 'Failed to save cart items');
        }
    };

    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            Alert.alert('Empty Cart', 'Your cart is empty');
            return;
        }
    
        try {
    
            // 1. Create a single order object containing all items
            const orderObject = {
                id: Date.now().toString(), // Generate a unique ID using timestamp
                items: cartItems,
                address: profile.address,
                orderDate: format(new Date(), "dd MMMM | hh:mma"),
                totalPrice: totalPrice,
                totalItem: totalItem
            };
            //console.log(orderObject);
    
            // 2. Save order to my-order-on-going.txt
            const orderUri = FileSystem.documentDirectory + 'my-order-on-going.txt';
            
            // Check if file exists and append to it, or create new
            const orderFileExists = await FileSystem.getInfoAsync(orderUri);
            let existingOrders = [];
            
            if (orderFileExists.exists) {
                const existingContent = await FileSystem.readAsStringAsync(orderUri);
                existingOrders = JSON.parse(existingContent);
            }
            
            // Add new order to the list of orders
            existingOrders.push(orderObject);
            
            await FileSystem.writeAsStringAsync(
                orderUri,
                JSON.stringify(existingOrders),
                { encoding: FileSystem.EncodingType.UTF8 }
            );
    
            // 3. Clear the cart
            await saveCartToFile([]);
            setCartItems([]);
            setTotalPrice(0);
    
            // 4. Navigate to success page
            router.push('/order-success');
        } catch (error) {
            console.error('Error during checkout:', error);
            Alert.alert('Checkout Failed', 'There was a problem processing your order');
        }
    };

    const renderRightActions = (index: number) => (
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(index)}>
            <TrashIcon />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()}>
                <BackIcon />
            </TouchableOpacity>
            <Text style={styles.header}>My Cart</Text>

            <FlatList
                data={cartItems}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <Swipeable renderRightActions={() => renderRightActions(index)}>
                        <MyCartItem item={item} />
                    </Swipeable>
                )}
                style={{ flex: 1 }}
                ListEmptyComponent={
                    <View style={styles.emptyCart}>
                        <Text style={styles.emptyCartText}>Your cart is empty</Text>
                    </View>
                }
            />

            <View style={styles.bottom}>
                <View>
                    <Text style={styles.textBottom}>Total price:</Text>
                    <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
                </View>
                <TouchableOpacity 
                    style={[styles.button, cartItems.length === 0 && styles.buttonDisabled]} 
                    onPress={handleCheckout}
                    disabled={cartItems.length === 0}
                >
                    <BuyIconWhite />
                    <Text style={styles.buttonText}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 26,
        marginTop: 20,
        backgroundColor: '#ffffff',
    },
    header: {
        fontFamily: 'Poppins',
        color: '#001833',
        fontSize: 20,
        fontWeight: '500',
        marginVertical: 15,
    },
    bottom:{
        flexDirection: 'row',
        flex: 1/6,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    button: {
        backgroundColor: '#324A59',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        width: 162,
        height: 52,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: 'Poppins',
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
    },
    textBottom: {
        fontFamily: 'Poppins',
        color: '#001833',
        fontSize: 12,
        fontWeight: '500',
        opacity: 0.22,
    },
    totalPrice:{
        fontFamily: 'Poppins',
        color: '#001833',
        fontSize: 22,
        fontWeight: '600',
    },
    deleteButton: {
        backgroundColor: '#FFE5E5',
        justifyContent: 'center',
        alignItems: 'center',
        width: 48,
        height: 96,
        borderRadius: 15,
        marginLeft: 10,
    },
    buttonDisabled: {
        backgroundColor: '#AAAAAA',
    },
    emptyCart: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    emptyCartText: {
        fontFamily: 'Poppins',
        color: '#AAAAAA',
        fontSize: 16,
    }
});