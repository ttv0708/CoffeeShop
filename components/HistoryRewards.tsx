import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import Cup from '@/assets/svg/cup';
import Address from '@/assets/svg/address';

export default function HistoryRewards({ item }: { item: any }) {
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, marginVertical: 15, marginLeft: 5 }}>
                <View style={styles.rowHeader}>
                    <Text style={styles.date}>{item.orderDate}</Text>
                    <Text style={styles.price}>${Number(item.price).toFixed(2)}</Text>
                </View >
                <View style={styles.row}>
                    <Cup style={{marginRight: 10}}/>
                    <Text style={styles.name}>{item.name}</Text>
                </View>
                <View style={styles.row}>
                    <Address style={{marginRight: 10}}/>
                    <Text style={styles.address}>{item.address}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 96,
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
