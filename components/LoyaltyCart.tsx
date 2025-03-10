//components/LoyaltyCart.tsx
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';

import CheckedCup from '@/assets/svg/checkedCup';
import UnCheckCup from '@/assets/svg/unCheckCup'; 

import { useProfile } from '@/contexts/ProfileContext';

export default function LoyaltyCart() {
    const totalCups = 8;
    
    const { profile, setProfile } = useProfile();
    //console.log('Profile:', profile);

    const checkedCupsCnt = Math.min(profile?.loyaltyCnt ?? 0, totalCups);
    const uncheckedCupsCnt = totalCups - checkedCupsCnt;
  
    const checkLoyaltyStatus = async () => {
      if (checkedCupsCnt >= totalCups) {
        Alert.alert("Congratulations", "You get 100 bonus points!");
  
        const newRewardPoints = (profile?.rewardPoints ?? 0) + 100;
        const updatedProfile = {
          ...profile,
          loyaltyCnt: 0,
          rewardPoints: newRewardPoints,
        };
  
        setProfile(updatedProfile);

  
        const fileUri = `${FileSystem.documentDirectory}profile.txt`;
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(updatedProfile));
      } else {
        if (uncheckedCupsCnt === 1) {
          Alert.alert("", "You are missing 1 cup to get 100 points.");
        } else {
          Alert.alert("", `You are missing ${uncheckedCupsCnt} cups to get 100 points.`);
        }
      }
    };


    return (
        <TouchableOpacity style={styles.container} onPress={checkLoyaltyStatus}>
            <View style={styles.header}>
                <Text style={styles.title}>Loyalty Cart</Text>
                <Text style={styles.title}>{profile?.loyaltyCnt ?? 0} / {totalCups}</Text>
            </View>
            <View style={styles.cntCup}>
                {[...Array(checkedCupsCnt)].map((_, index) => (
                    <CheckedCup key={index} />
                ))}
                {[...Array(uncheckedCupsCnt)].map((_, index) => (
                    <UnCheckCup key={index} />
                ))}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#324A59',
        borderRadius: 12,
        marginHorizontal: 25,
        paddingHorizontal: 20,
        paddingVertical: 10,
        height: 122,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 14,
        color: '#D8D8D8',
        fontWeight: '500',  // Note: fontWeight should be a string in React Native
    },
    cntCup: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 12,
        marginVertical: 10,
    }
});