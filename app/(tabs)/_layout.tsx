import { Tabs } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import BottomNavBar from '@/src/components/BottomNavBar'

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            display: 'none',
          },
          sceneStyle: {
            flex: 1,
          },
        }}
        tabBar={(props) => <BottomNavBar {...props} />}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
          }}
        />
        <Tabs.Screen
          name="trailer"
          options={{
            title: 'Trailer',
          }}
        />
        <Tabs.Screen
          name="watchlist"
          options={{
            title: 'Watchlist',
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
          }}
        />
      </Tabs>
    </View>
  )
}
