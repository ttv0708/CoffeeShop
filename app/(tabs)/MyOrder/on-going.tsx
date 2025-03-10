import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Button } from 'react-native';
import { useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system';

import MyOrderItem from '@/components/MyOrderItem';

import { useProfile } from '@/contexts/ProfileContext';
import { useOrders } from '@/contexts/OrderContext';
import { useHistoryOrder } from '@/contexts/HistoryOrderContext';

interface OrderItem {
    id: string;
    totalPrice: number;
    totalItem: number;
    [key: string]: any; // Cho các thuộc tính khác
  }

export default function OnGoing() {
    const router = useRouter();
    const [select, setSelect] = useState('On going');

    const { profile, setProfile } = useProfile();
    const { orderItems, removeOrder, loadOrders } = useOrders();
    const { addToHistoryOrder } = useHistoryOrder();

    useEffect(() => {
        loadOrders();
    }, []);


    const moveToHistory = async (id: string) => {
        try {
            // 1. Get the item to move
            const itemToMove = orderItems.find(item => item.id === id);
            if (!itemToMove) {
                throw new Error('Item not found');
            }
            // console.log('Item to move:', itemToMove);
            
            // 2. Add the item to history
            await addToHistoryOrder(itemToMove);
            
            // 3. Remove item from ongoing orders
            await removeOrder(id);
            
           // 4. Update the profile with reward points and loyalty count
           const priceInt = Math.floor(Number(itemToMove.totalPrice));
           let newRewardPoints = profile.rewardPoints || 0;
           let newLoyaltyCnt = profile.loyaltyCnt || 0;
     
           if (priceInt > 0) {
             newRewardPoints += priceInt;
             newLoyaltyCnt = Math.min(profile.loyaltyCnt + itemToMove.totalItem, 8);
           }
     
           const updatedProfile = {
             ...profile,
             rewardPoints: newRewardPoints,
             loyaltyCnt: newLoyaltyCnt,
           };

            setProfile(updatedProfile);

            Alert.alert('Success', 'Order moved to history');
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Error', 'Failed to move order to history');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.option} onPress={() => setSelect('On going')}>
                    <Text style={[styles.title, select === 'On going' && styles.titleSelected]}>On going</Text>
                    <View style={[styles.line, select === 'On going' && styles.lineSelected]}></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={() => {
                    setSelect('History');
                    router.push('./history'); 
                }}>
                    <Text style={[styles.title, select === 'History' && styles.titleSelected]}>History</Text>
                    <View style={[styles.line, select === 'History' && styles.lineSelected]}></View>
                </TouchableOpacity>
            </View>
            <FlatList
                data={[...orderItems].reverse()}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity 
                      onPress={() => {
                        
                        Alert.alert(
                          "Confirm Order Received",
                          "Have you received this order?",
                          [
                            {
                              text: "Cancel",
                              style: "cancel"
                            },
                            {
                              text: "Yes",
                              onPress: () => moveToHistory(item.id)
                            }
                          ]
                        );
                      }}
                    >
                      <MyOrderItem item={item} />
                    </TouchableOpacity>
                  )}
                style={{ flex: 1, bottom: 120 }}
                ListEmptyComponent={
                    <View style={styles.emptyCart}>
                        <Text style={styles.emptyCartText}>No order on going</Text>
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
