import { useAuth } from '@clerk/expo'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function OAuthCallback() {
  const router = useRouter()
  const { isSignedIn, isLoaded } = useAuth()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // Redirect to home/tabs after successful OAuth
      router.replace('/(tabs)')
    } else if (isLoaded && !isSignedIn) {
      // If still not signed in, go back to sign in
      router.replace('/(auth)/sign-in')
    }
  }, [isLoaded, isSignedIn, router])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Completing sign in...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
})
