import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar} from 'expo-status-bar';
import { useEffect, useState, useCallback } from 'react';
import { View, Image, StyleSheet, ImageBackground, Text } from 'react-native';
import SplashIcon from "../assets/svg/splashIcon";

import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ProfileProvider } from '@/contexts/ProfileContext';
import { OrderProvider } from '@/contexts/OrderContext';
import { HistoryOrderProvider } from '@/contexts/HistoryOrderContext';

import * as NavigationBar from "expo-navigation-bar";

NavigationBar.setPositionAsync("absolute");
NavigationBar.setBackgroundColorAsync("#ffffff01");

// Ngăn chặn Splash Screen tự động ẩn trước khi tải xong
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [appReady, setAppReady] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Giả lập quá trình load tài nguyên (ví dụ: API, dữ liệu)
        await new Promise(resolve => setTimeout(resolve, 5000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
        SplashScreen.hideAsync();
      }
    }

    if (loaded) {
      prepare();
    }
  }, [loaded]);

  // Nếu ứng dụng chưa sẵn sàng, hiển thị Splash Screen
  if (!appReady) {
    return (
      <ImageBackground
        style={styles.container}
        source={require('../assets/images/splashScreenBackground.png')}
      >
        <StatusBar style='dark'/>
        <View style={styles.container}>
          <SplashIcon />
          <Text style={styles.text}>Ordinary Coffee House</Text>
        </View>
      </ImageBackground>
    );
  }

  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style='dark'/>
      <ProfileProvider>
        <OrderProvider>
          <HistoryOrderProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="coffee-detail" options={{ headerShown: false }} />
            <Stack.Screen name="my-cart" options={{ headerShown: false}} />
            <Stack.Screen name="order-success" options={{ headerShown: false}} />
            <Stack.Screen name="profile" options={{ headerShown: false}}/>
            <Stack.Screen name="redeem" options={{ headerShown: false}} />
            <Stack.Screen name="+not-found" />
          </Stack>
          </HistoryOrderProvider>
        </OrderProvider>
      </ProfileProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
      fontSize: 24,
      color: "#FFFAF6", 
      fontFamily: 'Poppins-Medium',
  },
});
