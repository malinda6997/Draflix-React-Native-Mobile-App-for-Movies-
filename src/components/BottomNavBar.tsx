import React from 'react'
import { View, Pressable, StyleSheet, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Home, Film, BookmarkCheck, Download } from 'lucide-react-native'
import { LinearGradient } from 'expo-linear-gradient'

export default function BottomNavBar() {
  const navigation = useNavigation<any>()

  const handleNavigate = (screen: string) => {
    navigation.navigate(screen as never)
  }

  return (
    <LinearGradient
      colors={['rgba(20, 20, 30, 0.9)', 'rgba(10, 10, 20, 0.95)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.navContainer}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.navContent}>
          {/* Home */}
          <Pressable
            style={({ pressed }) => [styles.navItem, pressed && styles.navItemPressed]}
            onPress={() => handleNavigate('index')}
          >
            <View style={styles.iconWrapper}>
              <Home size={24} color="#00D9FF" strokeWidth={2} />
            </View>
            <View style={styles.activeIndicator} />
          </Pressable>

          {/* Trailer */}
          <Pressable
            style={({ pressed }) => [styles.navItem, pressed && styles.navItemPressed]}
            onPress={() => handleNavigate('trailer')}
          >
            <View style={styles.iconWrapper}>
              <Film size={24} color="#00D9FF" strokeWidth={2} />
            </View>
            <View style={styles.activeIndicator} />
          </Pressable>

          {/* Saved */}
          <Pressable
            style={({ pressed }) => [styles.navItem, pressed && styles.navItemPressed]}
            onPress={() => handleNavigate('watchlist')}
          >
            <View style={styles.iconWrapper}>
              <BookmarkCheck size={24} color="#00D9FF" strokeWidth={2} />
            </View>
            <View style={styles.activeIndicator} />
          </Pressable>

          {/* Download */}
          <Pressable
            style={({ pressed }) => [styles.navItem, pressed && styles.navItemPressed]}
            onPress={() => handleNavigate('profile')}
          >
            <View style={styles.iconWrapper}>
              <Download size={24} color="#00D9FF" strokeWidth={2} />
            </View>
            <View style={styles.activeIndicator} />
          </Pressable>
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
    paddingHorizontal: 16,
  },
  navItemPressed: {
    opacity: 0.7,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIndicator: {
    width: 6,
    height: 2,
    borderRadius: 1,
    marginTop: 4,
    backgroundColor: '#00D9FF',
  },
})
