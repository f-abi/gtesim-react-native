import { Colors } from '@/constants/Colors';
import { MoveLeft, X } from '@tamagui/lucide-icons';
import Constants from 'expo-constants';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, useColorScheme, useWindowDimensions, ViewStyle } from 'react-native';
import { View, Text, Input, Form, Button, YStack } from 'tamagui';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useState } from 'react';
import { i18n } from '@/utils/i18n';

import { useForm, Controller } from 'react-hook-form';

const headerHeight = 50;

type FormData = {
  email: string;
  password: string;
};

export const LogInRoute = () => {
  const colorScheme = useColorScheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const onSubmit = (data: FormData) => {
    console.log('✅ 表单提交:', data);
    setSubmittedData(data);
  };

  return (
    <YStack gap="$4" px="$4" py="$6" rounded="$4" bg={'$accent12'}>
      {/* Email */}
      <Controller
        control={control}
        name="email"
        rules={{
          required: '请输入邮箱',
          pattern: {
            value: /^\S+@\S+$/i,
            message: '邮箱格式不正确',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text mb="$1">邮箱</Text>
            <Input
              placeholder="请输入邮箱"
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
            {errors.email && <Text color="red">{errors.email.message}</Text>}
          </View>
        )}
      />

      {/* Password */}
      <Controller
        control={control}
        name="password"
        rules={{
          required: '请输入密码',
          minLength: {
            value: 6,
            message: '密码长度至少为 6 位',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text mb="$1">密码</Text>
            <Input
              placeholder="请输入密码"
              secureTextEntry
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
            {errors.password && <Text color="red">{errors.password.message}</Text>}
          </View>
        )}
      />

      <Button onPress={handleSubmit(onSubmit)}>提交</Button>

      {submittedData && (
        <View mt="$3">
          <Text>提交成功 🎉</Text>
          <Text>邮箱: {submittedData.email}</Text>
          <Text>密码: {submittedData.password}</Text>
        </View>
      )}
    </YStack>
  );
};

export default function Modal() {
  const colorScheme = useColorScheme();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  return (
    <View flex={1} flexDirection={'column'}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <View
        flexDirection={'row'}
        items={'center'}
        justify={'space-between'}
        px={24}
        style={{
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          ...Platform.select<ViewStyle>({
            android: {
              height: Constants.statusBarHeight + headerHeight,
              paddingTop: Constants.statusBarHeight,
            },
            ios: {
              height: headerHeight,
            },
          }),
        }}
      >
        <View height={24} width={24} items={'center'} justify={'center'}>
          {Platform.OS === 'android' && (
            <MoveLeft
              size={24}
              onPress={() => {
                router.back();
              }}
            />
          )}
        </View>
        <View>
          <Text>gtesim</Text>
        </View>
        <View height={24} width={24} items={'center'} justify={'center'}>
          {Platform.OS === 'ios' && (
            <X
              size={24}
              onPress={() => {
                router.back();
              }}
            />
          )}
        </View>
      </View>
      <TabView
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        navigationState={{
          index,
          routes: [
            { key: 'logIn', title: i18n.t('auth.logIn') },
            { key: 'signUp', title: i18n.t('auth.signUp') },
          ],
        }}
        commonOptions={{
          labelStyle: {
            fontSize: 16,
          },
        }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: Colors[colorScheme ?? 'light'].text }}
            contentContainerStyle={{}}
            style={{ backgroundColor: Colors[colorScheme ?? 'light'].background }}
            activeColor={Colors[colorScheme ?? 'light'].text}
            inactiveColor={Colors[colorScheme ?? 'light'].tabIconDefault}
            tabStyle={{
              height: headerHeight,
            }}
          />
        )}
        renderScene={SceneMap({
          logIn: LogInRoute,
          signUp: () => (
            <View>
              <Text>2</Text>
            </View>
          ),
        })}
      />
    </View>
  );
}
