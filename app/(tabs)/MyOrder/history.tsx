import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

import HistoryOrderItem from '@/components/HistoryOrderItem';

import { useHistoryOrder } from '@/contexts/HistoryOrderContext';

interface OrderItem {
    price: number;
    [key: string]: any; // Allow for other properties
}

export default function History() {
    const router = useRouter();
    const [select, setSelect] = useState('History');

    const { orderItems } = useHistoryOrder();
    
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.option} onPress={() => {
                    setSelect('On going');
                    router.push('./on-going'); 
                }}>
                    <Text style={[styles.title, select === 'On going' && styles.titleSelected]}>On going</Text>
                    <View style={[styles.line, select === 'On going' && styles.lineSelected]}></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={() => setSelect('History')}>
                    <Text style={[styles.title, select === 'History' && styles.titleSelected]}>History</Text>
                    <View style={[styles.line, select === 'History' && styles.lineSelected]}></View>
                </TouchableOpacity>
            </View>
            <FlatList
                    data={[...orderItems].reverse()}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <HistoryOrderItem item={item} />
                    )}
                    style={{ flex: 1, bottom: 120 }}
                    ListEmptyComponent={
                        <View style={styles.emptyCart}>
                            <Text style={styles.emptyCartText}>No order history</Text>
                        </View>
                    }
                />        
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 26,
        paddingTop: 10,
        backgroundColor: 'white',
    },
    headerContainer: {
        flex: 1/3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginHorizontal: 40,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        color: '#D8D8D8',
    },
    titleSelected: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        color: '#001833',
    },
    option: {
        height: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    line: {
        backgroundColor: '#D8D8D8',
        height: 2,
        width: 93,
    },
    lineSelected: {
        backgroundColor: '#324A59',
        height: 2,
        width: 93,
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
