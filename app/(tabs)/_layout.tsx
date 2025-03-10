//app/%(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Dimensions } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import TabBar from '@/components/TabBar';

const screenHeight = Dimensions.get('window').height;

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={props => <TabBar {...props} />}
    >
      <Tabs.Screen
      name="HomeScreen/index"
      options={{ headerShown: false }}
      />
      <Tabs.Screen
      name="Rewards/index"
      options={{
        headerShown: true,
        title: 'Rewards',
        headerTitleAlign: 'center',
        headerStyle: {
          borderBottomWidth: 0,
          elevation: 0, // For Android
        },
        headerTitleStyle: {
          fontFamily: 'Poppins', 
          fontSize: 16, 
          fontWeight: 'bold',
          color: '#001833',
        },
      }}
      />
      <Tabs.Screen
      name="MyOrder"
      options={{
        headerShown: true,
        title: 'My Order',
        headerTitleAlign: 'center',
        headerStyle: {
          borderBottomWidth: 0,
          elevation: 0, // For Android
        },
        headerTitleStyle: {
          fontFamily: 'Poppins', 
          fontSize: 16, 
          fontWeight: 'bold',
          color: '#001833',
        },
      }}
      />
    </Tabs>
  );
}