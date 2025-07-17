import { I18n } from 'i18n-js';
import en from '@/locales/langs/en.json'
import zh from '@/locales/langs/zh.json'
import ko from '@/locales/langs/ko.json'

const i18n = new I18n({
  en,
  zh,
  ko,
});

export { i18n }
