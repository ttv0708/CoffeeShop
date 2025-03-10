import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import Americano from '@/assets/svg/americano';
import Cappuccino from '@/assets/svg/cappuccino';
import Mocha from '@/assets/svg/mocha';
import FlatWhite from '@/assets/svg/flatWhite';

const drinkIcons: any = {
    "Cafe Latte": Americano,
    Cappuccino: Cappuccino,
    "Flat White": FlatWhite,
};

export default function RedeemItem({ item }: { item: any }) {
    const DrinkIcon = drinkIcons[item.name];

    return (
        <View style={styles.container}>
            <View style={styles.iconWrapper}>
                {DrinkIcon ? <DrinkIcon /> : null}
            </View>

            <View >
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.date}>Valid until {item.date}</Text>
            </View>

            <View style={styles.pointContainer}>
                <Text style={styles.point}>{item.points} pts</Text>
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
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 5,
    },
    date: {
        fontFamily: 'Poppins',
        color: '#324A5980',
        fontSize: 10,
        fontWeight: '500',
        opacity: 0.5,
    },
    image: {
        width: 82,
        height: 61,
    },
    point: {
        fontFamily: 'Poppins',
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '500',
    },
    pointContainer:{
        backgroundColor: '#324A59',
        borderRadius: 50,
        height: 32,
        width: 76,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconWrapper: {
        width: 100, 
        height: 57,
        justifyContent: 'center',
        alignItems: 'center',
      },
      
});
