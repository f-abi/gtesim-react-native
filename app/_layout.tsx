import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useAppStore } from '@/stores/appStore';
import { useEffect, useRef } from 'react';

import 'react-native-url-polyfill/auto';
import { TamaguiProvider } from 'tamagui';
import TamaguiConfig from '@/tamagui.config';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const appStore = useRef(useAppStore()).current;
  const [loaded] = useFonts({
    'MiSans-Bold': require('@/assets/fonts/MiSans-Bold.otf'),
    'MiSans-Demibold': require('@/assets/fonts/MiSans-Demibold.otf'),
    'MiSans-ExtraLight': require('@/assets/fonts/MiSans-ExtraLight.otf'),
    'MiSans-Heavy': require('@/assets/fonts/MiSans-Heavy.otf'),
    'MiSans-Light': require('@/assets/fonts/MiSans-Light.otf'),
    'MiSans-Medium': require('@/assets/fonts/MiSans-Medium.otf'),
    'MiSans-Normal': require('@/assets/fonts/MiSans-Normal.otf'),
    'MiSans-Regular': require('@/assets/fonts/MiSans-Regular.otf'),
    'MiSans-Semibold': require('@/assets/fonts/MiSans-Semibold.otf'),
    'MiSans-Thin': require('@/assets/fonts/MiSans-Thin.otf'),
  });

  useEffect(() => {
    appStore.initLanguage();
  }, [appStore]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <TamaguiProvider config={TamaguiConfig} defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </TamaguiProvider>
  );
}
