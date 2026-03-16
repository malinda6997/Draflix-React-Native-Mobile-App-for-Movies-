import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native'
import { Info, Github, Heart } from 'lucide-react-native'

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* App Info Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Info size={20} color="#FF0000" />
          <Text style={styles.sectionTitle}>App Information</Text>
        </View>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>App Name</Text>
            <Text style={styles.infoValue}>Draflix</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Created Date</Text>
            <Text style={styles.infoValue}>March 2026</Text>
          </View>
        </View>
      </View>

      {/* License Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Heart size={20} color="#FF6B6B" />
          <Text style={styles.sectionTitle}>License</Text>
        </View>
        <View style={styles.licenseCard}>
          <Text style={styles.licenseTitle}>MIT License</Text>
          <Text style={styles.licenseText}>
            Draflix is open source software licensed under the MIT License. You are free to use, modify, and distribute this software as long as you include the original license and copyright notice.
          </Text>
          <Text style={styles.licenseSubtext}>
            Copyright © 2026. All rights reserved.
          </Text>
        </View>
      </View>

      {/* Developer Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Github size={20} color="#FF0000" />
          <Text style={styles.sectionTitle}>Developer Information</Text>
        </View>
        <View style={styles.developerCard}>
          <View style={styles.developerInfo}>
            <Text style={styles.developerName}>Development Team</Text>
            <Text style={styles.developerRole}>Mobile App Developers</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.featureList}>
            <Text style={styles.featureTitle}>Key Features:</Text>
            <Text style={styles.feature}>• Browse trending TV shows</Text>
            <Text style={styles.feature}>• Save favorite shows to watchlist</Text>
            <Text style={styles.feature}>• Search for shows and movies</Text>
            <Text style={styles.feature}>• View show details and ratings</Text>
            <Text style={styles.feature}>• Dark theme UI design</Text>
            <Text style={styles.feature}>• Smooth navigation experience</Text>
          </View>
        </View>
      </View>

      {/* Technologies Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Built With</Text>
        <View style={styles.techCard}>
          <View style={styles.techItem}>
            <Text style={styles.techBadge}>React Native</Text>
          </View>
          <View style={styles.techItem}>
            <Text style={styles.techBadge}>Expo</Text>
          </View>
          <View style={styles.techItem}>
            <Text style={styles.techBadge}>TypeScript</Text>
          </View>
          <View style={styles.techItem}>
            <Text style={styles.techBadge}>Expo Router</Text>
          </View>
          <View style={styles.techItem}>
            <Text style={styles.techBadge}>TMDB API</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Draflix • Made with ❤️ by Mobile Developers
        </Text>
        <Text style={styles.footerVersion}>Version 1.0.0 • 2026</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1e',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 0, 0, 0.1)',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 10,
  },
  infoCard: {
    backgroundColor: 'rgba(255, 0, 0, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 0, 0, 0.1)',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#FF0000',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
  },
  licenseCard: {
    backgroundColor: 'rgba(255, 107, 107, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.2)',
  },
  licenseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
    marginBottom: 10,
  },
  licenseText: {
    fontSize: 13,
    color: '#ccc',
    lineHeight: 20,
    marginBottom: 12,
  },
  licenseSubtext: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  developerCard: {
    backgroundColor: 'rgba(255, 0, 0, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 0, 0, 0.1)',
  },
  developerInfo: {
    paddingVertical: 12,
  },
  developerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF0000',
    marginBottom: 4,
  },
  developerRole: {
    fontSize: 13,
    color: '#999',
  },
  featureList: {
    paddingVertical: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  feature: {
    fontSize: 13,
    color: '#ccc',
    marginBottom: 6,
    lineHeight: 18,
  },
  techCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  techItem: {
    marginRight: 8,
    marginBottom: 8,
  },
  techBadge: {
    backgroundColor: '#FF0000',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: '600',
    overflow: 'hidden',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 0, 0, 0.1)',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  footerVersion: {
    fontSize: 12,
    color: '#666',
  },
})
