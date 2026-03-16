import { tmdbApi, getImageUrl } from '@/src/api/tmdbApi'
import { MovieCard } from '@/src/components/MovieCard'
import { LoadingSpinner } from '@/src/components/LoadingSpinner'
import { useWatchlist } from '@/src/hooks/useWatchlist'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useCallback, useEffect, useState } from 'react'
import {
  FlatList,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { ChevronLeft, MoreVertical, Heart, Share2, Download } from 'lucide-react-native'

export default function MovieDetailScreen() {
  const params = useLocalSearchParams()
  const router = useRouter()
  const movieId = Number(params.movieId)
  const { isInWatchlist, toggleWatchlist } = useWatchlist()

  const [movie, setMovie] = useState<any>(null)
  const [similarMovies, setSimilarMovies] = useState<any[]>([])
  const [videos, setVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showFullOverview, setShowFullOverview] = useState(false)

  const loadMovieDetails = useCallback(async () => {
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
  }, [movieId])

  useEffect(() => {
    loadMovieDetails()
  }, [loadMovieDetails])

  if (loading || !movie) {
    return <LoadingSpinner />
  }

  const youtubeTrailer = videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer')
  const releaseYear = new Date(movie.release_date).getFullYear()
  const ratingStars = Math.round(movie.vote_average / 2)

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
      {/* Poster with overlay and info */}
      <View style={styles.posterContainer}>
        <ImageBackground
          source={{
            uri: getImageUrl(movie.poster_path || movie.backdrop_path, 500) ?? 'https://via.placeholder.com/500x300'
          }}
          style={styles.posterImage}
          imageStyle={{ borderRadius: 0, resizeMode: 'cover' }}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.8)']}
            locations={[0, 0.5, 1]}
            style={styles.posterGradient}
          />
          
          {/* Header Buttons - Top */}
          <View style={styles.headerButtons}>
            <Pressable
              style={({ pressed }) => [styles.iconButton, pressed && styles.iconButtonPressed]}
              onPress={() => router.back()}
            >
              <ChevronLeft size={28} color="#fff" />
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.iconButton, pressed && styles.iconButtonPressed]}
            >
              <MoreVertical size={24} color="#fff" />
            </Pressable>
          </View>

          {/* Movie Info - Positioned at bottom of poster */}
          <View style={styles.posterInfoContainer}>
            {/* Title */}
            <Text style={styles.posterTitle}>{movie.title}</Text>

            {/* Year, Rating, Duration Row */}
            <View style={styles.posterMetaRow}>
              <Text style={styles.posterYear}>{releaseYear}</Text>
              <View style={styles.posterRatingRow}>
                <Text style={styles.posterStarRating}>
                  {Array(ratingStars).fill('★').join('')}
                  {Array(5 - ratingStars).fill('☆').join('')}
                </Text>
              </View>
              <Text style={styles.posterDuration}>{movie.runtime}min</Text>
            </View>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <View style={styles.posterGenresRow}>
                {movie.genres.slice(0, 2).map((genre: any) => (
                  <Text key={genre.id} style={styles.posterGenreTag}>
                    {genre.name}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </ImageBackground>
      </View>

      {/* Action Buttons Section */}
      <View style={styles.actionButtonsSection}>
        {/* Main Action Buttons */}
        <View style={styles.mainButtons}>
          <Pressable
            style={({ pressed }) => [styles.trailerButton, pressed && styles.buttonPressed]}
            onPress={handleTrailer}
            disabled={!youtubeTrailer}
          >
            <Text style={styles.trailerButtonText}>▶ Trailer</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.watchButton, pressed && styles.buttonPressed]}
          >
            <Text style={styles.watchButtonText}>▶ Watch now</Text>
          </Pressable>
        </View>

        {/* Secondary Action Buttons */}
        <View style={styles.secondaryButtons}>
          <Pressable
            style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]}
            onPress={handleAddWatchlist}
          >
            <Heart 
              size={16} 
              color={isInWatchlist(movieId) ? '#fff' : '#999'}
              fill={isInWatchlist(movieId) ? '#fff' : 'none'}
            />
            <Text style={styles.actionButtonText}>Save</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]}
          >
            <Share2 size={16} color="#999" />
            <Text style={styles.actionButtonText}>Share</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]}
          >
            <Download size={16} color="#999" />
            <Text style={styles.actionButtonText}>Download</Text>
          </Pressable>
        </View>
      </View>

      {/* Storyline */}
      <View style={styles.storylineSection}>
        <Text style={styles.sectionTitle}>Storyline</Text>
        <Text 
          style={styles.overview}
          numberOfLines={showFullOverview ? undefined : 4}
        >
          {movie.overview}
        </Text>
        {!showFullOverview && (
          <Pressable onPress={() => setShowFullOverview(true)}>
            <Text style={styles.readMore}>Read more ⌄</Text>
          </Pressable>
        )}
      </View>

      {/* More Like This */}
      {similarMovies.length > 0 && (
        <View style={styles.moreSection}>
          <Text style={styles.sectionTitle}>More like this</Text>
          <FlatList
            data={similarMovies.slice(0, 10)}
            renderItem={({ item }) => <MovieCard movie={item} width={110} height={165} />}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            contentContainerStyle={styles.moviesScroll}
          />
        </View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a15',
  },
  posterContainer: {
    height: 520,
    width: '100%',
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  posterImage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingTop: 50,
    paddingBottom: 0,
    width: '100%',
    height: '100%',
  },
  posterGradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 1,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 10,
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonPressed: {
    opacity: 0.7,
  },
  posterInfoContainer: {
    zIndex: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 6,
  },
  posterTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 8,
  },
  posterMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  posterYear: {
    color: '#ccc',
    fontSize: 14,
  },
  posterRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  posterStarRating: {
    color: '#ffd700',
    fontSize: 14,
    fontWeight: '600',
  },
  posterDuration: {
    color: '#ccc',
    fontSize: 14,
  },
  posterGenresRow: {
    flexDirection: 'row',
    gap: 8,
  },
  posterGenreTag: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    color: '#ccc',
    fontSize: 12,
    fontWeight: '500',
  },
  actionButtonsSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#0a0a15',
  },
  infoSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#0a0a15',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  year: {
    color: '#999',
    fontSize: 13,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  starRating: {
    color: '#ffd700',
    fontSize: 14,
    fontWeight: '600',
  },
  ratingValue: {
    color: '#999',
    fontSize: 12,
  },
  duration: {
    color: '#999',
    fontSize: 13,
  },
  genresRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  genreTag: {
    backgroundColor: '#0a0f15',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  genreText: {
    color: '#ccc',
    fontSize: 12,
    fontWeight: '500',
  },
  mainButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  trailerButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  trailerButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  watchButton: {
    flex: 1,
    backgroundColor: '#FF0000',
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  watchButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  secondaryButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#0a0f15',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#333333',
  },
  actionButtonPressed: {
    opacity: 0.7,
  },
  actionButtonText: {
    color: '#999',
    fontSize: 12,
    fontWeight: '600',
  },
  storylineSection: {
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  overview: {
    color: '#aaa',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 8,
  },
  readMore: {
    color: '#999',
    fontSize: 13,
    fontWeight: '600',
  },
  moreSection: {
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  moviesScroll: {
    gap: 8,
  },
})
