import { tmdbApi, getImageUrl } from '@/src/api/tmdbApi'
import { MovieCard } from '@/src/components/MovieCard'
import { LoadingSpinner } from '@/src/components/LoadingSpinner'
import { useWatchlist } from '@/src/hooks/useWatchlist'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default function MovieDetailScreen() {
  const params = useLocalSearchParams()
  const router = useRouter()
  const movieId = Number(params.movieId)
  const { isInWatchlist, toggleWatchlist } = useWatchlist()

  const [movie, setMovie] = useState<any>(null)
  const [similarMovies, setSimilarMovies] = useState<any[]>([])
  const [videos, setVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMovieDetails()
  }, [movieId])

  const loadMovieDetails = async () => {
    try {
      setLoading(true)
      const [detailsRes, similarRes, videosRes] = await Promise.all([
        tmdbApi.getMovieDetails(movieId),
        tmdbApi.getSimilarMovies(movieId),
        tmdbApi.getMovieVideos(movieId),
      ])

      setMovie(detailsRes.data)
      setSimilarMovies(similarRes.data.results || [])
      setVideos(videosRes.data.results || [])
    } catch (error) {
      console.error('Error loading movie details:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !movie) {
    return <LoadingSpinner />
  }

  const youtubeTrailer = videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer')

  const handleAddWatchlist = async () => {
    await toggleWatchlist(movieId)
  }

  const handleTrailer = () => {
    if (youtubeTrailer) {
      router.push({
        pathname: '/trailer',
        params: { videoKey: youtubeTrailer.key },
      })
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Backdrop Image */}
      <ImageBackground
        source={{ uri: getImageUrl(movie.backdrop_path, 1280) }}
        style={styles.backdropContainer}
        imageStyle={styles.backdropImage}
      >
        <View style={styles.backdropOverlay} />
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
      </ImageBackground>

      {/* Movie Content */}
      <View style={styles.contentContainer}>
        {/* Title and Rating */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>{movie.title}</Text>
          <View style={styles.metaContainer}>
            <Text style={styles.rating}>⭐ {movie.vote_average?.toFixed(1)}/10</Text>
            <Text style={styles.year}>{new Date(movie.release_date).getFullYear()}</Text>
          </View>
        </View>

        {/* Synopsis */}
        <View style={styles.synopsisContainer}>
          <Text style={styles.sectionTitle}>Synopsis</Text>
          <Text style={styles.synopsis}>{movie.overview}</Text>
        </View>

        {/* Movie Details Grid */}
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Budget</Text>
            <Text style={styles.detailValue}>
              ${movie.budget ? (movie.budget / 1000000).toFixed(1) + 'M' : 'N/A'}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Revenue</Text>
            <Text style={styles.detailValue}>
              ${movie.revenue ? (movie.revenue / 1000000).toFixed(1) + 'M' : 'N/A'}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Runtime</Text>
            <Text style={styles.detailValue}>{movie.runtime} min</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Status</Text>
            <Text style={styles.detailValue}>{movie.status}</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            onPress={handleTrailer}
            disabled={!youtubeTrailer}
          >
            <Text style={styles.buttonText}>▶ Watch Trailer</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.watchlistButton,
              isInWatchlist(movieId) && styles.watchlistButtonActive,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleAddWatchlist}
          >
            <Text
              style={[
                styles.buttonText,
                isInWatchlist(movieId) && styles.watchlistButtonText,
              ]}
            >
              {isInWatchlist(movieId) ? '✓ Saved' : '+ Watchlist'}
            </Text>
          </Pressable>
        </View>

        {/* Genres */}
        {movie.genres && movie.genres.length > 0 && (
          <View style={styles.genresContainer}>
            <Text style={styles.sectionTitle}>Genres</Text>
            <View style={styles.genresWrapper}>
              {movie.genres.map((genre: any) => (
                <View key={genre.id} style={styles.genreTag}>
                  <Text style={styles.genreText}>{genre.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Similar Movies */}
        {similarMovies.length > 0 && (
          <View style={styles.similarContainer}>
            <Text style={styles.sectionTitle}>More Like This</Text>
            <FlatList
              data={similarMovies.slice(0, 10)}
              renderItem={({ item }) => <MovieCard movie={item} width={150} height={225} />}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
            />
          </View>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backdropContainer: {
    height: 250,
    justifyContent: 'flex-start',
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  backdropImage: {
    opacity: 0.4,
  },
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  headerSection: {
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  rating: {
    color: '#ffd700',
    fontSize: 14,
    fontWeight: '600',
  },
  year: {
    color: '#999',
    fontSize: 14,
  },
  synopsisContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  synopsis: {
    color: '#ccc',
    fontSize: 13,
    lineHeight: 20,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
    gap: 12,
  },
  detailItem: {
    width: '48%',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 8,
  },
  detailLabel: {
    color: '#666',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 6,
  },
  detailValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  button: {
    flex: 1,
    backgroundColor: '#0a7ea4',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  watchlistButton: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
  },
  watchlistButtonActive: {
    backgroundColor: '#0a7ea4',
    borderColor: '#0a7ea4',
  },
  watchlistButtonText: {
    color: '#fff',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  genresContainer: {
    marginBottom: 24,
  },
  genresWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genreTag: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  genreText: {
    color: '#0a7ea4',
    fontSize: 12,
    fontWeight: '600',
  },
  similarContainer: {
    marginBottom: 40,
  },
})
