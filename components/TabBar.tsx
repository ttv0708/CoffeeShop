import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React from 'react';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import HomeIcon from "../assets/svg/homeIcon";
import RewardIcon from "../assets/svg/rewardIcon";
import OrderIcon from "../assets/svg/orderIcon";

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const icons: { [key: string]: any } = {
    HomeScreen: HomeIcon,
    Rewards: RewardIcon,
    MyOrder: OrderIcon,
  };

  const primaryColor = '#324A59';
  const greyColor = '#D8D8D8';

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const routeKey = route.name.replace('/index', ''); // Chuẩn hóa route.name
        const isFocused = state.index === index;
        const IconComponent = icons[routeKey];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <TouchableOpacity
            key={route.name}
            style={styles.tabBarItem}
            onPress={onPress}
          >
            {IconComponent && (
              <IconComponent
                width={24}
                height={24}
                fill={isFocused ? primaryColor : greyColor} // Đổi màu icon khi nhấn
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    bottom: 25,
    paddingVertical: 20,
    marginHorizontal: 26,
    width: Dimensions.get('window').width - 52,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default TabBar;
