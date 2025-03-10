import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import Americano from '@/assets/svg/americano';
import Cappuccino from '@/assets/svg/cappuccino';
import Mocha from '@/assets/svg/mocha';
import FlatWhite from '@/assets/svg/flatWhite';

const drinkIcons: any = {
    Americano: Americano,
    Cappuccino: Cappuccino,
    Mocha: Mocha,
    "Flat White": FlatWhite,
};

export default function MyCartItem({ item }: { item: any }) {
    const DrinkIcon = drinkIcons[item.name];

    return (
        <View style={styles.container}>
            <View style={styles.iconWrapper}>
                {DrinkIcon ? <DrinkIcon /> : null}
            </View>
            <View style={{ flex: 1, marginVertical: 15, marginLeft: 5 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.options}>{item.shot} | {item.select} | {item.size} | {item.ice}</Text>
                <Text style={styles.cnt}>x {item.count}</Text>
            </View>
            <View>
                <Text style={styles.price}>${Number(item.price).toFixed(2)}</Text>
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
        fontSize: 12,
        fontWeight: '500',
    },
    options: {
        fontFamily: 'Poppins',
        color: '#757575',
        fontSize: 10,
        fontWeight: '300',
        marginVertical: 5,
    },
    cnt: {
        fontFamily: 'Poppins',
        color: '#001833',
        fontSize: 12,
        fontWeight: '600',
    },
    image: {
        width: 82,
        height: 61,
    },
    price: {
        fontFamily: 'Poppins',
        color: '#001833',
        fontSize: 16,
        fontWeight: '500',
    },
    iconWrapper: {
        width: 100, 
        height: 57,
        justifyContent: 'center',
        alignItems: 'center',
      },
});
