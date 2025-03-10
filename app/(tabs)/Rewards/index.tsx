import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';

import LoyaltyCart from '@/components/LoyaltyCart';
import MyPoints from '@/components/MyPoints';

import HistoryOrderItem from '@/components/HistoryOrderItem';

import { useHistoryOrder } from '@/contexts/HistoryOrderContext';

interface OrderItem {
    price: number;
    [key: string]: any; // Allow for other properties
}

export default function Rewards() {
    
    const { orderItems } = useHistoryOrder();


    return (
        <View style={styles.container}>
            <LoyaltyCart />
            <MyPoints />
            <View style={styles.rewardContainer}>
                <Text style={styles.history}>History Rewards</Text>
                <FlatList
                    data={[...orderItems].reverse()}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <HistoryOrderItem item={item} />
                    )}
                    style={{ flex: 1, bottom: 80, marginTop: 90 }}
                    ListEmptyComponent={
                        <View style={styles.emptyCart}>
                            <Text style={styles.emptyCartText}>No order history</Text>
                        </View>
                    }
                />        
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    history:{
        fontFamily: 'Poppins',
        fontSize: 14,
        color: '#324A59',
        fontWeight: '500',
        marginBottom: 10,
    },
    rewardContainer: {
        flex: 1,
        marginHorizontal: 26,
        marginVertical: 20,
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