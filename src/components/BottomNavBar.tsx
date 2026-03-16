import React from 'react'
import { View, Pressable, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Home, Film, BookmarkCheck, Cog } from 'lucide-react-native'
import { LinearGradient } from 'expo-linear-gradient'

interface TabBarProps {
  state: any
  descriptors: any
  navigation: any
  position?: any
}

export default function BottomNavBar({
  state,
  descriptors,
  navigation,
}: TabBarProps) {
  const navItems = [
    { label: 'Home', icon: Home, name: 'index' },
    { label: 'TV Series', icon: Film, name: 'trailer' },
    { label: 'Saved', icon: BookmarkCheck, name: 'watchlist' },
    { label: 'Settings', icon: Cog, name: 'profile' },
  ]

  return (
    <LinearGradient
      colors={['rgba(20, 20, 30, 0.9)', 'rgba(10, 10, 20, 0.95)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.navContainer}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.navContent}>
          {navItems.map((item) => {
            const isFocused = state.index === state.routes.findIndex((r: any) => r.name === item.name)
            const Icon = item.icon

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: item.name,
                canPreventDefault: true,
              })

              if (!isFocused && !event.defaultPrevented) {
                // Use jumpTo for tab navigation
                if (navigation.jumpTo) {
                  navigation.jumpTo(item.name)
                } else {
                  navigation.navigate(item.name)
                }
              }
            }

            return (
              <Pressable
                key={item.name}
                style={({ pressed }) => [
                  styles.navItem,
                  pressed && styles.navItemPressed,
                  isFocused && styles.navItemActive,
                ]}
                onPress={onPress}
              >
                <View style={styles.iconWrapper}>
                  <Icon
                    size={24}
                    color={isFocused ? '#FF0000' : '#666'}
                    strokeWidth={2}
                  />
                </View>
                <Text
                  style={[
                    styles.navLabel,
                    { color: isFocused ? '#FF0000' : '#666' },
                  ]}
                >
                  {item.label}
                </Text>
                {isFocused && <View style={styles.activeIndicator} />}
              </Pressable>
            )
          })}
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  navContainer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 0, 0, 0.1)',
  },
  safeArea: {
    backgroundColor: 'transparent',
    paddingTop: 0,
  },
  navContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 1,
    paddingBottom: 4,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 1,
    paddingHorizontal: 12,
  },
  navItemActive: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderRadius: 8,
  },
  navItemPressed: {
    opacity: 0.8,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 2,
  },
  activeIndicator: {
    width: 4,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#FF0000',
    marginTop: 2,
  },
})
