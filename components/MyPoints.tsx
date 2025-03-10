//components/MyPoints.tsx
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';

import CoffeeIcon from '@/assets/svg/coffeeIcon';
import { useRouter } from 'expo-router';
import { useProfile } from '@/contexts/ProfileContext';

export default function MyPoints() {
    const router = useRouter();
    const { profile, setProfile } = useProfile();

    return (
        <View style={styles.myPointsBackground}>
            <CoffeeIcon style={styles.coffeePosition}/>
            <View style={styles.myPointsLeft}>
                <Text style={styles.myPointsText}>My Points:</Text>
                <Text style={styles.myPointsNumber}>{profile?.rewardPoints ?? 0}</Text>
            </View>
            <View style={styles.myPointsRight}>
                <TouchableOpacity onPress={() => router.push('/redeem')}>
                    <View style={styles.redeemContainer}>
                        <View style={styles.redeemBackground} />
                        <Text style={styles.redeemText}>Redeem drinks</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    myPointsBackground: {
        backgroundColor: '#324A59',
        height: 108,
        borderRadius: 12,
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 25,
      },
      coffeePosition: {
        position: "absolute", 
        bottom: -25, 
        right: -10, 
      },
      myPointsText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: '#D8D8D8',
      },
      myPointsNumber: {
        fontFamily: 'Poppins-Medium',
        fontSize: 24,
        color: '#D8D8D8',
      },
      redeemText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 10,
        color: '#D8D8D8',
        opacity: 1.0,
      },
      redeemContainer: {
        position: 'relative', 
        padding: 7, 
        borderRadius: 5,
        overflow: 'hidden', 
      },
      redeemBackground: {
        backgroundColor: '#A2CDE9',
        opacity: 0.19,
        borderRadius: 5,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      myPointsLeft: {
        justifyContent: 'center',
        marginLeft: 20,
      },
      myPointsRight: {
        justifyContent: 'center',
        marginRight: 20,
      },
});