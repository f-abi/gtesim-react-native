import { Image } from 'expo-image';
import Constants from 'expo-constants';
import { shopifyClient } from '@/utils/shopifyClient';
import React, { useEffect, useState } from 'react';
import { GetCollectionsQuery } from '@/types/storefront.generated';
import { RefreshControl, Text, View, StyleSheet, Appearance } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { BlurView } from 'expo-blur';
import { Colors } from '@/constants/Colors';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

type ListData = GetCollectionsQuery['collections']['edges'];

export default function HomeScreen() {
  const topBarHeight = Constants.statusBarHeight + 50;
  const tabBarHeight = useBottomTabBarHeight();
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
            first: 100, // 最多查询100个系列（根据需求调整）
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
          className="flex-1 items-center justify-center"
          style={{
            paddingTop: Constants.statusBarHeight,
          }}
        >
          <Text className="text-2xl font-semibold">GTESIM</Text>
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
        contentInset={{ top: topBarHeight, bottom: tabBarHeight }}
        scrollIndicatorInsets={{
          top: topBarHeight,
          bottom: tabBarHeight,
        }}
        contentContainerStyle={{
          paddingTop: topBarHeight,
          paddingBottom: tabBarHeight,
        }}
        progressViewOffset={topBarHeight}
        renderItem={({ item }) => (
          <View className="px-4 py-2">
            <View className="flex-row items-center justify-between rounded-[12] bg-white p-4 ">
              <View className="flex-row items-center">
                <Image
                  source={item.node.image?.url}
                  style={{ width: 40, height: 40, borderRadius: 8 }}
                />
                <Text className="ml-2 text-base dark:text-white">{item.node.title}</Text>
              </View>
              <View>
                <Text>LIcon</Text>
              </View>
            </View>
          </View>
        )}
      />
    </>
  );
}
