import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { format } from 'date-fns';

import BackIcon from '@/assets/svg/backIcon';
import RedeemItem from '@/components/RedeemItem';

import { useRouter } from 'expo-router';
import { useProfile } from '@/contexts/ProfileContext';
import { useOrders } from '@/contexts/OrderContext';

interface RedeemItem {
    name: string;
    date: string;
    points: number;
  }
  
const RedeemList: RedeemItem[] = [
    {
        name: 'Cafe Latte',
        date: '04.07.21',
        points: 1
    },
    {
        name: 'Flat White',
        date: '04.07.21',
        points: 1340
    },
    {
        name: 'Cappuccino',
        date: '04.07.21',
        points: 1340
    }
];

export default function Redeem() {
    const router = useRouter();
    const { profile, setProfile } = useProfile();
    const { addOrder } = useOrders();

    const redeemDrink = async (index: number) => {
        const selectedItem = RedeemList[index];
    
        if (selectedItem.points > profile.rewardPoints) {
            Alert.alert('Not enough points', `You need ${selectedItem.points} points to redeem this drink.`);
            return;
        }
    
        try {
            const newRewardPoints = profile.rewardPoints - selectedItem.points;
            
            const updatedProfile = {
                ...profile,
                rewardPoints: newRewardPoints,
              };
            
            //console.log('Updated profile after deducting points:', updatedProfile);
            setProfile(updatedProfile);

            const orderObject = {
                id: Date.now().toString(), // Generate a unique ID using timestamp
                ...selectedItem,
                address: profile.address,
                orderDate: format(new Date(), "dd MMMM | hh:mma"),
                totalPrice: 0,
                totalItem: 1,
            };       
    
            await addOrder(orderObject);
    
            Alert.alert('Success', `You have redeemed a ${selectedItem.name}!`);
    
        } catch (error) {
            console.error('Error during redemption:', error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        }
    };
    
    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <BackIcon />
                </TouchableOpacity>
                <Text style={styles.headerText}>Redeem</Text>
            </View>
                <FlatList
                    data={RedeemList}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                        onPress={() => {
                            Alert.alert(
                                "Confirm redemption",    // title
                                "Are you sure you want to redeem this drink?",    // message (bạn có thể chỉnh lại cho phù hợp)
                                [
                                  {
                                    text: "Cancel",
                                    style: "cancel"
                                  },
                                  {
                                    text: "Yes",
                                    onPress: () => redeemDrink(index)
                                  }
                                ]
                              );                              
                          }}>
                            <RedeemItem item={item} />
                        </TouchableOpacity>
                    )}
                    style={{ flex: 1 }}
                    ListEmptyComponent={
                        <View style={styles.emptyCart}>
                            <Text style={styles.emptyCartText}>No drink available for redemption!</Text>
                        </View>
                    }
                />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 26,
    },
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
    },
    headerText:{
        fontFamily: 'Poppins',
        color: '#001833',
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 15,
        flex: 1,
        textAlign: 'center',
        marginLeft: -20,
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