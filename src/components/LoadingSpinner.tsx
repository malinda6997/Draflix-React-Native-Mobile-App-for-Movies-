import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export const LoadingSpinner: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#093FB4" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a15',
  },
})
