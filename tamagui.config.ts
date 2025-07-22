import { defaultConfig } from '@tamagui/config/v4';
import { createFont, createTamagui } from 'tamagui';

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  fonts: {
    heading: createFont({
      ...defaultConfig.fonts.heading,
      family: 'MiSans',
    }),
    body: createFont({
      ...defaultConfig.fonts.body,
      family: 'MiSans',
    }),
  },
});

export type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

export default tamaguiConfig;
