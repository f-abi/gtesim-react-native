import { Image } from 'expo-image';
import { View, Text, Button, Appearance, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useAppStore } from '@/stores/appStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { i18n } from '@/utils/i18n';

import { shopifyClient } from '@/utils/shopifyClient';
import { AlertDialog, XStack, YStack, Button as TButton } from 'tamagui';
import { useState } from 'react';
import { useRouter } from 'expo-router';

import PagerView from 'react-native-pager-view';

export default function HomeScreen() {
  const [open, setOpen] = useState(false);
  const appStore = useAppStore();

  const router = useRouter();

  const getProductList = async () => {
    try {
      const { data } = await shopifyClient.request(
        /* GraphQL */ `
          #graphql
          query getProducts($first: Int!, $country: CountryCode, $language: LanguageCode)
          @inContext(country: $country, language: $language) {
            products(first: $first) {
              edges {
                node {
                  id
                  title # 返回翻译后的标题（如果配置了多语言）
                  description # 返回翻译后的描述
                  featuredImage {
                    url
                  }
                  variants(first: 1) {
                    edges {
                      node {
                        price {
                          # 返回该国家的价格
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        {
          variables: {
            first: 10,
          },
        },
      );
      console.log(data?.products.edges);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClick = async () => {
    try {
      const { data } = await shopifyClient.request(/* GraphQL */ `
        #graphql
        query shop {
          shop {
            name
            id
          }
        }
      `);
      console.log(data?.shop.name);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={{
            height: 178,
            width: 290,
            bottom: 0,
            left: 0,
            position: 'absolute',
          }}
        />
      }
    >
      <TButton
        fontSize={'$4'}
        onPress={() => {
          router.push('/auth');
        }}
      >
        登录
      </TButton>
      <View>
        <Text className="bg-red-300">{appStore.language}</Text>
      </View>
      <View>
        <Text style={{ fontFamily: 'MiSans' }}>
          {`文本撒打算大撒打算大撒打算大撒请问请问请问123456`}
        </Text>
      </View>
      <View>
        <Text>{`文本撒打算大撒打算大撒打算大撒请问请问请问123456`}</Text>
      </View>
      <View>
        <Text
          style={{
            fontWeight: '900',
          }}
        >{`文本撒打算大撒打算大撒打算大撒请问请问请问123456`}</Text>
      </View>
      <Button title="ShopifyHomeData" onPress={handleClick} />
      <Button title="获取产品" onPress={getProductList} />
      <Button
        title="ko"
        onPress={() => {
          appStore.setLanguage('ko');
        }}
      />
      <Button
        title="en"
        onPress={() => {
          appStore.setLanguage('en');
        }}
      />
      <Button
        title="zh"
        onPress={() => {
          appStore.setLanguage('zh');
        }}
      />
      <Button
        title="de"
        onPress={() => {
          appStore.setLanguage('default');
        }}
      />
      <Button
        title="allKey"
        onPress={() => {
          AsyncStorage.getAllKeys().then((_) => {
            console.log(_);
            _.map((__) => {
              AsyncStorage.getItem(__).then((___) => {
                console.log(___);
              });
            });
          });
        }}
      />
      <Button
        title="COLOR: null"
        onPress={() => {
          Appearance.setColorScheme(null);
        }}
      />
      <Button
        title="COLOR: light"
        onPress={() => {
          Appearance.setColorScheme('light');
        }}
      />
      <Button
        title="COLOR: dark"
        onPress={() => {
          Appearance.setColorScheme('dark');
        }}
      />
    </ParallaxScrollView>
  );
}
