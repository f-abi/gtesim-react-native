import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  language: 'zh-CN' | 'en-US';
  isFirstLaunch: boolean;
  setLanguage: (language: 'zh-CN' | 'en-US') => void;
  setFirstLaunch: (isFirst: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'zh-CN',
      isFirstLaunch: true,
      setLanguage: (language) => set({ language }),
      setFirstLaunch: (isFirst) => set({ isFirstLaunch: isFirst }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
