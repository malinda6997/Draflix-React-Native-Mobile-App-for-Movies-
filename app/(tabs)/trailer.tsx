import React, { useCallback, useEffect, useState } from 'react'
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native'
import { Image } from 'expo-image'
import * as WebBrowser from 'expo-web-browser'
import { tmdbApi } from '@/src/api/tmdbApi'
import { Play } from 'lucide-react-native'

const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500'

export default function TrailerScreen() {
  const [movies, setMovies] = useState<any[]>([])
  const [trailers, setTrailers] = useState<{ [key: number]: any }>({})
  const [loading, setLoading] = useState(true)

  const loadMoviesAndTrailers = useCallback(async () => {
    try {
      setLoading(true)
      // Get trending movies
      const moviesResponse = await tmdbApi.getTrending()
      const moviesList = moviesResponse.data.results?.slice(0, 12) || []
      setMovies(moviesList)

      // Fetch trailers for each movie
      const trailersData: { [key: number]: any } = {}
      for (const movie of moviesList.slice(0, 6)) {
        try {
          const videosResponse = await tmdbApi.getMovieVideos(movie.id)
          const trailerVideo = videosResponse.data.results?.find(
            (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
          )
          if (trailerVideo) {
            trailersData[movie.id] = trailerVideo
          }
        } catch {
          console.log(`Error fetching trailer for movie ${movie.id}`)
        }
      }
      setTrailers(trailersData)
    } catch {
      console.error('Error loading movies')
      Alert.alert('Error', 'Failed to load trailers')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadMoviesAndTrailers()
  }, [loadMoviesAndTrailers])

  const handleWatchTrailer = async (movieId: number, movieTitle: string) => {
    const trailer = trailers[movieId]
    if (trailer?.key) {
      try {
        await WebBrowser.openBrowserAsync(
          `https://www.youtube.com/watch?v=${trailer.key}`
        )
      } catch {
        Alert.alert('Error', 'Unable to open trailer')
      }
    } else {
      Alert.alert('Not Available', `Trailer for "${movieTitle}" is not available`)
    }
  }

  const renderTrailerCard = ({ item }: { item: any }) => {
    const hasTrailer = trailers[item.id]
    const posterUrl = item.poster_path
      ? `${POSTER_BASE_URL}${item.poster_path}`
      : 'https://via.placeholder.com/300x450?text=No+Image'

    return (
      <Pressable
        onPress={() => handleWatchTrailer(item.id, item.title)}
        style={styles.trailerCard}
      >
        <View style={styles.posterContainer}>
          <Image
            source={posterUrl}
            style={styles.poster}
            contentFit="cover"
          />
          <View
            style={[
              styles.playButtonOverlay,
              { backgroundColor: hasTrailer ? 'rgba(0, 217, 255, 0.9)' : 'rgba(100, 100, 100, 0.7)' },
            ]}
          >
            <Play
              size={40}
              color="#fff"
              fill="#fff"
            />
          </View>
          {!hasTrailer && (
            <View style={styles.notAvailableOverlay}>
              <Text style={styles.notAvailableText}>Not Available</Text>
            </View>
          )}
        </View>
        <Text style={styles.movieTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.movieYear}>
          {new Date(item.release_date).getFullYear()}
        </Text>
      </Pressable>
    )
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#00D9FF" />
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Trailers</Text>
        <Text style={styles.subtitle}>Watch movie trailers</Text>
      </View>

      <FlatList
        data={movies}
        renderItem={renderTrailerCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.gridContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1e',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 217, 255, 0.1)',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
  },
  gridRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  gridContent: {
    paddingTop: 16,
    paddingBottom: 20,
  },
  trailerCard: {
    flex: 1,
    marginHorizontal: 4,
  },
  posterContainer: {
    position: 'relative',
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: 240,
    borderRadius: 12,
  },
  playButtonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  notAvailableOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notAvailableText: {
    color: '#999',
    fontSize: 12,
    fontWeight: '600',
  },
  movieTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  movieYear: {
    fontSize: 12,
    color: '#999',
  },
})
