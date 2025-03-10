import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import Cup from '@/assets/svg/cup';
import Address from '@/assets/svg/address';

export default function MyOrderItem({ item }: { item: any }) {
    // Initialize empty list of coffees to display
    const coffeesToDisplay = [];
    
    // Check if we're dealing with the new order format
    if (item && item.items && Array.isArray(item.items)) {
        // This is a full order with multiple items
        const nameCounts: { [key: string]: number } = {};
        
        // First pass: count all items by name
        for (const coffee of item.items) {
            const name = coffee.name || "Unknown";
            if (!nameCounts[name]) {
                nameCounts[name] = 0;
            }
            nameCounts[name] += coffee.count; // Count each item individually, not by its quantity
        }
        
        // Second pass: create display items
        for (const name in nameCounts) {
            coffeesToDisplay.push({
                name: name,
                quantity: nameCounts[name]
            });
        }
    } else {
        // This is a single coffee item
        coffeesToDisplay.push({
            name: item.name || "Unknown Coffee",
            quantity: 1
        });
    }
    
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, marginVertical: 5, marginLeft: 5 }}>
                <View style={styles.rowHeader}>
                    <Text style={styles.date}>{item.orderDate}</Text>
                    <Text style={styles.price}>
                        ${Number(item.totalPrice || item.price || 0).toFixed(2)}
                    </Text>
                </View>
                {coffeesToDisplay.map((coffee, index) => (
                    <View key={index} style={styles.row}>
                        <Cup style={{marginRight: 10}}/>
                        <Text style={styles.name}>{coffee.name} x{coffee.quantity}</Text>
                    </View>
                ))}
                <View style={styles.row}>
                    <Address style={{marginRight: 10}}/>
                    <Text style={styles.address}>{item.address || "No address"}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F7F8FB',
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    name: {
        fontFamily: 'Poppins',
        color: '#001833',
        fontSize: 10,
        fontWeight: '500',
    },
    date: {
        fontFamily: 'Poppins',
        color: '#324A59',
        fontSize: 10,
        fontWeight: '500',
        opacity: 0.3,
    },
    price: {
        fontFamily: 'Poppins',
        color: '#001833',
        fontSize: 16,
        fontWeight: '500',
    },
    address: {
        fontFamily: 'Poppins',
        color: '#324A59',
        fontSize: 10,
        fontWeight: '500',
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    rowHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
    }
});
