import React, { useState } from 'react'
import { View, Pressable, StyleSheet, SafeAreaView, Text } from 'react-native'
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native'
import { Home, Film, BookmarkCheck, Download } from 'lucide-react-native'
import { LinearGradient } from 'expo-linear-gradient'

export default function BottomNavBar() {
  const navigation = useNavigation<any>()
  const route = useRoute()
  const [activeTab, setActiveTab] = useState('index')

  useFocusEffect(
    React.useCallback(() => {
      if (route.name === 'index') setActiveTab('index')
      else if (route.name === 'search') setActiveTab('search')
      else if (route.name === 'trailer') setActiveTab('trailer')
      else if (route.name === 'watchlist') setActiveTab('watchlist')
      else if (route.name === 'profile') setActiveTab('profile')
    }, [route.name])
  )

  const handleNavigate = (screen: string) => {
    setActiveTab(screen)
    try {
      // Use jumpTo for tab navigation which is more reliable
      if (navigation.jumpTo) {
        navigation.jumpTo(screen)
      } else {
        navigation.navigate(screen as never)
      }
    } catch (error) {
      console.log('Navigation error:', error)
    }
  }

  const navItems = [
    { label: 'Home', icon: Home, screen: 'index' },
    { label: 'Trailer', icon: Film, screen: 'trailer' },
    { label: 'Saved', icon: BookmarkCheck, screen: 'watchlist' },
    { label: 'Download', icon: Download, screen: 'profile' },
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
            const isActive = activeTab === item.screen
            const Icon = item.icon

            return (
              <Pressable
                key={item.screen}
                style={({ pressed }) => [
                  styles.navItem,
                  pressed && styles.navItemPressed,
                  isActive && styles.navItemActive,
                ]}
                onPress={() => handleNavigate(item.screen)}
              >
                <View style={styles.iconWrapper}>
                  <Icon
                    size={24}
                    color={isActive ? '#00D9FF' : '#666'}
                    strokeWidth={2}
                  />
                </View>
                <Text
                  style={[
                    styles.navLabel,
                    { color: isActive ? '#00D9FF' : '#666' },
                  ]}
                >
                  {item.label}
                </Text>
                {isActive && <View style={styles.activeIndicator} />}
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
    borderTopColor: 'rgba(0, 217, 255, 0.1)',
  },
  safeArea: {
    backgroundColor: 'transparent',
  },
  navContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  navItemActive: {
    backgroundColor: 'rgba(0, 217, 255, 0.1)',
    borderRadius: 8,
  },
  navItemPressed: {
    opacity: 0.8,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 4,
  },
  activeIndicator: {
    width: 4,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#00D9FF',
    marginTop: 4,
  },
})
