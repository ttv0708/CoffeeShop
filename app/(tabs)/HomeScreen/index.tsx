import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, SafeAreaView } from 'react-native';

import BuyIcon from '@/assets/svg/buyIcon';
import UserIcon from '@/assets/svg/userIcon';

import LoyaltyCart from '@/components/LoyaltyCart';

import Americano from '@/assets/svg/americano';
import Cappuccino from '@/assets/svg/cappuccino';
import Mocha from '@/assets/svg/mocha';
import FlatWhite from '@/assets/svg/flatWhite';

import { useRouter } from 'expo-router';
import { useProfile } from '@/contexts/ProfileContext';

import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function HomeScreen() {
    const router = useRouter();
    const { profile, setProfile } = useProfile();

    const coffeeList = [
        { name: "Americano", icon: <Americano /> },
        { name: "Cappuccino", icon: <Cappuccino /> },
        { name: "Mocha", icon: <Mocha /> },
        { name: "Flat White", icon: <FlatWhite /> }
    ];

    const navigateToDetail = (coffeeName: string) => {
        router.push(`/coffee-detail?name=${encodeURIComponent(coffeeName)}`);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greetingText}>
                        {new Date().getHours() < 12 ? 'Good morning' : 'Good evening'}
                    </Text>
                    <Text style={styles.nameText}>{profile ? profile.fullName : ''}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <BuyIcon style={{ marginRight: 20 }} onPress={() => router.push('/my-cart')} />
                    <UserIcon onPress={() => router.push('/profile')}/>
                </View>
            </View>

            {/* Loyalty Cart */}
            <LoyaltyCart />

            {/* Menu Coffee */}
            <View style={styles.menuCoffee}>
                <Text style={styles.menuText}>Choose your coffee</Text>
                
                {/* Scrollable coffee list */}
                <ScrollView 
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.coffeeList}>
                        {coffeeList.map((item, index) => (
                            <TouchableOpacity 
                                key={index} 
                                style={styles.coffeeItem} 
                                onPress={() => navigateToDetail(item.name)}
                            >
                                {item.icon}
                                <Text style={styles.coffeeName}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flex: 1 / 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 26,
        paddingTop: 20,
    },
    greetingText: {
        fontFamily: 'Popins',
        fontSize: 14,
        color: '#D8D8D8',
    },
    nameText: {
        fontFamily: 'Popins',
        fontSize: 18,
        color: '#001833',
        fontWeight: '500',
    },
    menuCoffee: {
        flex: 1,
        backgroundColor: '#324A59',
        marginTop: 35,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingBottom: 80, // Tăng padding bottom để tránh tab bar
    },
    menuText: {
        fontFamily: 'Popins',
        fontSize: 16,
        color: '#D8D8D8',
        fontWeight: '500',
        marginLeft: 26,
        marginTop: 20,
        marginBottom: 5,
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 30, 
        justifyContent: 'center',
    },
    coffeeList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginHorizontal: 26,
        alignItems: 'center',
        alignContent: 'center',
        rowGap: 5,
        columnGap: 20,
    },
    coffeeItem: {
        backgroundColor: 'white',
        borderRadius: 15,
        width: 154,
        height: 184,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
    },
    coffeeName: {
        fontFamily: 'DM Sans',
        fontSize: 14,
        color: '#001833',
        fontWeight: '500',
        marginTop: 20,
    },
});