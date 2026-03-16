import React, { useEffect, useState } from 'react'
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native'
import { Image } from 'expo-image'
import { tmdbApi } from '@/src/api/tmdbApi'
import { Star, BookmarkCheck } from 'lucide-react-native'
import { useWatchlist } from '@/src/hooks/useWatchlist'

const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500'

export default function TVSeriesScreen() {
  const [tvSeries, setTvSeries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { isInWatchlist, toggleWatchlist } = useWatchlist()

  useEffect(() => {
    const loadTVSeries = async () => {
      try {
        setLoading(true)
        const response = await tmdbApi.getTrending()
        const seriesList = response.data.results?.slice(0, 12) || []
        setTvSeries(seriesList)
      } catch (error) {
        console.log('Error loading TV series:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadTVSeries()
  }, [])

  const renderSeries = ({ item }: { item: any }) => {
    const posterUrl = item.poster_path
      ? `${POSTER_BASE_URL}${item.poster_path}`
      : 'https://via.placeholder.com/500x750'
    
    const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A'
    const isSaved = isInWatchlist(item.id)

    return (
      <Pressable style={styles.seriesContainer}>
        <View style={styles.posterWrapper}>
          <Image
            source={{ uri: posterUrl }}
            style={styles.poster}
            contentFit="cover"
          />
          <View style={styles.ratingBadge}>
            <Star size={14} color="#FFD700" fill="#FFD700" />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
          <Pressable 
            style={[styles.saveButton, isSaved && styles.savButtonActive]}
            onPress={() => toggleWatchlist(item.id)}
          >
            <BookmarkCheck 
              size={20} 
              color={isSaved ? '#FF0000' : '#fff'} 
              fill={isSaved ? '#FF0000' : 'none'}
            />
          </Pressable>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {item.name || item.title}
        </Text>
        <Text style={styles.year}>
          {(item.first_air_date || item.release_date)?.split('-')[0] || 'N/A'}
        </Text>
      </Pressable>
    )
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>TV Series</Text>
        </View>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#FF0000" />
          <Text style={styles.loadingText}>Loading TV series...</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TV Series</Text>
        <Text style={styles.subtitle}>Popular shows</Text>
      </View>

      <FlatList
        data={tvSeries}
        renderItem={renderSeries}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1e',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 217, 255, 0.1)',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  subtitle: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#999',
    marginTop: 12,
    fontSize: 14,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  seriesContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  posterWrapper: {
    position: 'relative',
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#1a1a2e',
  },
  poster: {
    width: '100%',
    height: 220,
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 13,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 2,
  },
  year: {
    fontSize: 12,
    color: '#999',
  },
  saveButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  savButtonActive: {
    backgroundColor: 'rgba(0, 217, 255, 0.2)',
  },
})
