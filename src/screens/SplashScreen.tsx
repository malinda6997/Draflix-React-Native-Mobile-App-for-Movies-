import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

export default function SplashScreen() {
  const router = useRouter()

  useEffect(() => {
    // Skip directly to home after 2 seconds
    const timer = setTimeout(() => {
      router.replace('/(tabs)')
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  const handleStartNow = () => {
    router.push('/(tabs)')
  }

  return (
    <View
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>DRAFLIX</Text>
          <Text style={styles.subtitle}>Discover Premium Movies</Text>
        </View>

        {/* Hero Text */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Your Gateway to</Text>
          <Text style={styles.heroHighlight}>Cinematic Excellence</Text>
          <Text style={styles.heroDescription}>
            Stream trending movies and build your personal watchlist
          </Text>
        </View>
      </View>

      {/* Start Button */}
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.startButton,
            pressed && styles.startButtonPressed,
          ]}
          onPress={handleStartNow}
        >
          <Text style={styles.startButtonText}>Start Now</Text>
        </Pressable>
        <Text style={styles.disclaimerText}>
          Sign in or create an account to get started
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0a0a15',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    fontSize: 56,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 3,
  },
  subtitle: {
    fontSize: 14,
    color: '#0a7ea4',
    marginTop: 8,
    fontWeight: '600',
    letterSpacing: 1,
  },
  heroSection: {
    alignItems: 'center',
    gap: 16,
  },
  heroTitle: {
    fontSize: 28,
    color: '#ccc',
    fontWeight: '600',
  },
  heroHighlight: {
    fontSize: 36,
    fontWeight: '900',
    color: '#fff',
  },
  heroDescription: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 12,
  },
  buttonContainer: {
    paddingBottom: 60,
    alignItems: 'center',
    gap: 12,
  },
  startButton: {
    backgroundColor: '#0a7ea4',
    paddingHorizontal: 60,
    paddingVertical: 16,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  startButtonPressed: {
    opacity: 0.7,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  disclaimerText: {
    color: '#666',
    fontSize: 12,
  },
})
