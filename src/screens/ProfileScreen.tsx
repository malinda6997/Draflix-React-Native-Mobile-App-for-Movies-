import { useClerk, useUser } from '@clerk/expo'
import { Image } from 'expo-image'
import React from 'react'
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default function ProfileScreen() {
  const { user } = useUser()
  const { signOut } = useClerk()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container}>
        {/* User Profile Card */}
        <View style={styles.profileCard}>
          {user?.imageUrl && (
            <Image
              source={{ uri: user.imageUrl }}
              style={styles.avatar}
            />
          )}
          <Text style={styles.userName}>
            {user?.firstName || 'User'} {user?.lastName || ''}
          </Text>
          <Text style={styles.userEmail}>{user?.emailAddresses[0]?.emailAddress}</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Watchlist</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Watched</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          <Pressable style={styles.settingItem}>
            <Text style={styles.settingLabel}>Edit Profile</Text>
          </Pressable>
          <Pressable style={styles.settingItem}>
            <Text style={styles.settingLabel}>Notifications</Text>
          </Pressable>
          <Pressable style={styles.settingItem}>
            <Text style={styles.settingLabel}>Privacy Settings</Text>
          </Pressable>
        </View>

        {/* Sign Out Button */}
        <Pressable
          style={({ pressed }) => [
            styles.signOutButton,
            pressed && styles.signOutButtonPressed,
          ]}
          onPress={handleSignOut}
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#0a0a15',
  },
  container: {
    flex: 1,
    backgroundColor: '#0a0a15',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  userName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  userEmail: {
    color: '#666',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
    marginBottom: 30,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#0a7ea4',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    color: '#666',
    fontSize: 12,
  },
  settingsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  settingItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  settingLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  signOutButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  signOutButtonPressed: {
    opacity: 0.7,
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
})
