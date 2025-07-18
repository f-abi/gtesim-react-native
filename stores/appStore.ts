import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getLocales } from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppLanguageMap } from '@/constants/Language';
import { i18n } from '@/utils/i18n';

interface AppState {
  language: AppLanguage;
  setLanguage: (language: AppLanguage | 'default') => void;
  initLanguage: () => void;
}

/** 默认回退语言 */
const defaultLanguage: AppLanguage = 'en';

/** 获取默认语言 */
const getDefaultLanguage = (): AppLanguage => {
  const systemLanguage = getLocales()[0]?.languageCode;
  return systemLanguage && AppLanguageMap.includes(systemLanguage)
    ? (systemLanguage as AppLanguage)
    : defaultLanguage;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      language: getDefaultLanguage(),
      setLanguage: (language) => {
        const newLanguage: AppLanguage = language === 'default' ? getDefaultLanguage() : language;
        set({ language: newLanguage });
        get().initLanguage();
      },
      initLanguage: () => {
        i18n.locale = get().language;
      },
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
