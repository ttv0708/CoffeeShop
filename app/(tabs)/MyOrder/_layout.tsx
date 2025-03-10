import React from 'react';
import { Stack } from 'expo-router';

export default function MyOrderLayout() {
  return (
    <Stack 
      screenOptions={{
        headerShown: false, 
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="on-going" />
      <Stack.Screen name="history" />
    </Stack>
  );
}