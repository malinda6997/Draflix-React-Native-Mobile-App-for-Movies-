import { tmdbApi } from '@/src/api/tmdbApi'
import { HorizontalMovieScroll } from '@/src/components/HorizontalMovieScroll'
import { LoadingSpinner } from '@/src/components/LoadingSpinner'
import { getImageUrl } from '@/src/api/tmdbApi'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default function HomeScreen() {
  const [trendingMovies, setTrendingMovies] = useState<any[]>([])
  const [actionMovies, setActionMovies] = useState<any[]>([])
  const [comedyMovies, setComedyMovies] = useState<any[]>([])
  const [scifiMovies, setScifiMovies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [featuredMovie, setFeaturedMovie] = useState<any>(null)

  const loadMovies = useCallback(async () => {
    try {
      setLoading(true)
      const [trending, action, comedy, scifi] = await Promise.all([
        tmdbApi.getTrending(),
        tmdbApi.getActionMovies(),
        tmdbApi.getComedyMovies(),
        tmdbApi.getSciFiMovies(),
      ])

      setTrendingMovies(trending.data.results)
      setActionMovies(action.data.results)
      setComedyMovies(comedy.data.results)
      setScifiMovies(scifi.data.results)

      if (trending.data.results.length > 0) {
        setFeaturedMovie(trending.data.results[0])
      }
    } catch (error) {
      console.error('Error loading movies:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      loadMovies()
    }, [loadMovies])
  )

  if (loading && !featuredMovie) {
    return <LoadingSpinner />
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Featured Hero Section */}
      {featuredMovie && (
        <ImageBackground
          source={{
            uri: getImageUrl(featuredMovie.backdrop_path, 1280),
          }}
          style={styles.heroSection}
          imageStyle={styles.heroImage}
        >
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Text style={styles.featuredLabel}>NOW TRENDING</Text>
            <Text style={styles.movieTitle}>{featuredMovie.title}</Text>
            <Text style={styles.movieDescription} numberOfLines={3}>
              {featuredMovie.overview}
            </Text>
            <View style={styles.heroButtonsContainer}>
              <Pressable style={styles.watchButton}>
                <Text style={styles.watchButtonText}>▶ Watch Trailer</Text>
              </Pressable>
              <Pressable style={styles.detailsButton}>
                <Text style={styles.detailsButtonText}>See Details</Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>
      )}

      {/* Category Chips */}
      <View style={styles.chipsContainer}>
        <Pressable style={[styles.chip, styles.chipActive]}>
          <Text style={[styles.chipText, styles.chipTextActive]}>All</Text>
        </Pressable>
        <Pressable style={styles.chip}>
          <Text style={styles.chipText}>Action</Text>
        </Pressable>
        <Pressable style={styles.chip}>
          <Text style={styles.chipText}>Comedy</Text>
        </Pressable>
        <Pressable style={styles.chip}>
          <Text style={styles.chipText}>Sci-Fi</Text>
        </Pressable>
      </View>

      {/* Category Sections */}
      <HorizontalMovieScroll
        title="Trending Now"
        movies={trendingMovies}
        loading={loading}
      />
      <HorizontalMovieScroll
        title="Action Movies"
        movies={actionMovies}
        loading={loading}
      />
      <HorizontalMovieScroll
        title="Comedy Gold"
        movies={comedyMovies}
        loading={loading}
      />
      <HorizontalMovieScroll
        title="Sci-Fi Adventures"
        movies={scifiMovies}
        loading={loading}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  heroSection: {
    height: 500,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  heroImage: {
    opacity: 0.6,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  heroContent: {
    gap: 12,
  },
  featuredLabel: {
    color: '#0a7ea4',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 38,
  },
  movieDescription: {
    color: '#ccc',
    fontSize: 13,
    lineHeight: 18,
  },
  heroButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  watchButton: {
    backgroundColor: '#0a7ea4',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  watchButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  detailsButton: {
    borderColor: '#fff',
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  chipsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
    marginVertical: 16,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  chipActive: {
    backgroundColor: '#0a7ea4',
    borderColor: '#0a7ea4',
  },
  chipText: {
    color: '#999',
    fontSize: 12,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#fff',
  },
})
