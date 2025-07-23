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
    'MiSans-Regular': require('@/assets/fonts/MiSans-Regular.otf'),
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
          <Stack.Screen
            name="auth"
            options={{
              presentation: 'modal',
              headerShown: false,
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </TamaguiProvider>
  );
}
