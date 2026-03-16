import { useWatchlist } from '@/src/hooks/useWatchlist'
import React, { useState, useEffect } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native'
import { Image } from 'expo-image'
import { BookmarkCheck } from 'lucide-react-native'
import { tmdbApi } from '@/src/api/tmdbApi'

const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500'

export default function WatchlistScreen() {
  const { watchlist } = useWatchlist()
  const [savedItems, setSavedItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSavedShows = async () => {
      try {
        setLoading(true)
        
        if (!watchlist || watchlist.length === 0) {
          setSavedItems([])
          setLoading(false)
          return
        }

        const response = await tmdbApi.getTrending()
        const allShows = response.data.results || []
        const saved = allShows.filter(show => watchlist.includes(show.id))
        setSavedItems(saved)
      } catch (error) {
        console.log('Error loading saved shows:', error)
        setSavedItems([])
      } finally {
        setLoading(false)
      }
    }
    
    loadSavedShows()
  }, [watchlist])

  const renderSavedItem = ({ item }: { item: any }) => {
    const posterUrl = item.poster_path
      ? `${POSTER_BASE_URL}${item.poster_path}`
      : 'https://via.placeholder.com/500x750'

    return (
      <View style={styles.itemContainer}>
        <View style={styles.posterWrapper}>
          <Image
            source={{ uri: posterUrl }}
            style={styles.poster}
            contentFit="cover"
          />
          <View style={styles.savedBadge}>
            <BookmarkCheck size={16} color="#FF0000" fill="#FF0000" />
          </View>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {item.name || item.title}
        </Text>
        <Text style={styles.year}>
          {(item.first_air_date || item.release_date)?.split('-')[0] || 'N/A'}
        </Text>
      </View>
    )
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Saved Shows</Text>
        </View>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#FF0000" />
        </View>
      </View>
    )
  }

  if (watchlist.length === 0 || savedItems.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Saved Shows</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Saved Shows Yet</Text>
          <Text style={styles.emptyDescription}>
            Save your favorite TV shows from the TV Series tab
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Shows</Text>
        <Text style={styles.count}>{savedItems.length} shows</Text>
      </View>

      <FlatList
        data={savedItems}
        renderItem={renderSavedItem}
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
  count: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
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
  itemContainer: {
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
  savedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    backgroundColor: 'rgba(0, 217, 255, 0.2)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
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
})
