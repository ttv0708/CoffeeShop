import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import OrderSuccessIcon from '@/assets/svg/orderSuccessIcon';

export default function OrderSuccess() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <OrderSuccessIcon />
            <Text style={styles.header}>Order Success</Text>
            <Text style={styles.message}>Your order has been placed successfully.</Text>
            <Text style={styles.message}>For more details, go to my orders.</Text>
            <TouchableOpacity style={styles.button} onPress={()=> router.push('/MyOrder/on-going')}>
                <Text style={styles.buttonText}>Track My Order</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header:{
        fontFamily: 'Poppins',
        color: '#181D2D',
        fontSize: 22,
        fontWeight: '500',
        marginVertical: 15,
    },
    message:{
        fontFamily: 'Poppins',
        color: '#AAAAAA',
        fontSize: 14,
        fontWeight: '400',
        marginVertical: 5,
    },
    button:{
        backgroundColor: '#324A59',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginTop: 20,
        width: 315,
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 170,
    },
    buttonText:{
        fontFamily: 'Poppins',
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    }
});