import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function OAuthCallback() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home after OAuth callback
    router.replace('/(tabs)')
  }, [router])

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
