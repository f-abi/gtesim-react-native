import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  theme: 'light' | 'dark' | 'auto';
  language: 'zh-CN' | 'en-US';
  isFirstLaunch: boolean;
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  setLanguage: (language: 'zh-CN' | 'en-US') => void;
  setFirstLaunch: (isFirst: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'auto',
      language: 'zh-CN',
      isFirstLaunch: true,
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setFirstLaunch: (isFirst) => set({ isFirstLaunch: isFirst }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
