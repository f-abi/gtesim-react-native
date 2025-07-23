import Constants from 'expo-constants';
import { shopifyClient } from '@/utils/shopifyClient';
import React, { useEffect, useState } from 'react';
import { GetCollectionsQuery } from '@/types/storefront.generated';
import { RefreshControl, StyleSheet, Appearance } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { BlurView } from 'expo-blur';
import { Colors } from '@/constants/Colors';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, Card } from 'tamagui';
import { Image } from 'expo-image';

type ListData = GetCollectionsQuery['collections']['edges'];

export default function HomeScreen() {
  const headerHeight = 50;
  const topBarHeight = Constants.statusBarHeight + headerHeight;
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const colorScheme = Appearance.getColorScheme();
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<ListData>();
  const getProductList = async () => {
    try {
      setRefreshing(true);
      console.log('触发请求');
      const { data } = await shopifyClient.request(
        /* GraphQL */ `
          #graphql
          query getCollections($first: Int!) {
            collections(first: $first) {
              edges {
                node {
                  id
                  title
                  handle
                  description
                  image {
                    url
                  }
                }
              }
            }
          }
        `,
        {
          variables: {
            first: 100,
          },
        },
      );
      setData(data?.collections.edges);
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <>
      <BlurView
        tint="systemChromeMaterial"
        experimentalBlurMethod="dimezisBlurView"
        style={[
          StyleSheet.absoluteFill,
          {
            height: topBarHeight,
            borderBottomColor: Colors[colorScheme ?? 'light'].border,
            borderBottomWidth: StyleSheet.hairlineWidth,
            zIndex: 10,
          },
        ]}
      >
        <View
          height={headerHeight}
          pt={Constants.statusBarHeight}
          flex={1}
          items="center"
          justify="center"
        >
          <Text fontSize={'$8'}>123456</Text>
        </View>
      </BlurView>
      <FlashList
        data={data}
        keyExtractor={(item) => item.node.id}
        estimatedItemSize={32}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getProductList}
            progressViewOffset={topBarHeight}
          />
        }
        contentContainerStyle={{
          paddingTop: topBarHeight,
          paddingBottom: tabBarHeight,
        }}
        scrollIndicatorInsets={{
          top: headerHeight,
          bottom: tabBarHeight - insets.bottom,
        }}
        renderItem={({ item }) => (
          <View px={16} pt={10}>
            <Card size="$4" elevate alignItems="center" p={8}>
              <View
                width={'100%'}
                flexDirection={'row'}
                items={'center'}
                justify={'space-between'}
                rounded={4}
              >
                <View>
                  <Image
                    source={{
                      uri: item.node.image?.url,
                    }}
                    style={{ height: 40, width: 40, borderRadius: 8 }}
                    contentFit="cover"
                    transition={300}
                  />
                </View>
                <View>
                  <Text>123456</Text>
                </View>
              </View>
            </Card>
          </View>
        )}
      />
    </>
  );
}
