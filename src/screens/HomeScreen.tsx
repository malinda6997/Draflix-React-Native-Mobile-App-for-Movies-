import { tmdbApi } from '@/src/api/tmdbApi'
import { HorizontalMovieScroll } from '@/src/components/HorizontalMovieScroll'
import { LoadingSpinner } from '@/src/components/LoadingSpinner'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { Bell, Search } from 'lucide-react-native'

export default function HomeScreen() {
  const [trendingMovies, setTrendingMovies] = useState<any[]>([])
  const [actionMovies, setActionMovies] = useState<any[]>([])
  const [comedyMovies, setComedyMovies] = useState<any[]>([])
  const [topRatedMovies, setTopRatedMovies] = useState<any[]>([])
  const [dramaMovies, setDramaMovies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedGenre, setSelectedGenre] = useState('All')

  const loadMovies = useCallback(async () => {
    try {
      setLoading(true)
      const [trending, action, comedy, topRated, drama] = await Promise.all([
        tmdbApi.getTrending(),
        tmdbApi.getActionMovies(),
        tmdbApi.getComedyMovies(),
        tmdbApi.getTopRated(),
        tmdbApi.getDramaMovies(),
      ])

      setTrendingMovies(trending.data.results)
      setActionMovies(action.data.results)
      setComedyMovies(comedy.data.results)
      setTopRatedMovies(topRated.data.results)
      setDramaMovies(drama.data.results)
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

  if (loading && trendingMovies.length === 0) {
    return <LoadingSpinner />
  }

  const genres = ['All', 'Action', 'Drama', 'Comedy', 'Science']

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.profilePic}>
            <Text style={styles.profileText}>WK</Text>
          </View>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>William Krisna</Text>
          </View>
        </View>
        <Pressable style={styles.notificationIcon}>
          <Bell size={24} color="#fff" />
        </Pressable>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Main Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>Discover Your Next</Text>
        <Text style={[styles.mainTitle, styles.mainTitleBold]}>Favorite Movie.</Text>
      </View>

      {/* Genre Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.genreScroll}
        contentContainerStyle={styles.genreContent}
      >
        {genres.map((genre) => (
          <Pressable
            key={genre}
            style={[
              styles.genreChip,
              selectedGenre === genre && styles.genreChipActive,
            ]}
            onPress={() => setSelectedGenre(genre)}
          >
            <Text
              style={[
                styles.genreText,
                selectedGenre === genre && styles.genreTextActive,
              ]}
            >
              {genre}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Latest Movies */}
      <HorizontalMovieScroll
        title="Latest movies"
        movies={trendingMovies}
        loading={loading}
      />

      {/* Upcoming & Trending with Trailers */}
      <HorizontalMovieScroll
        title="Trending Now 🔥"
        movies={actionMovies}
        loading={loading}
      />

      {/* Comedy Movies */}
      <HorizontalMovieScroll
        title="Comedy Pick 😂"
        movies={comedyMovies}
        loading={loading}
      />

      {/* Drama Movies */}
      <HorizontalMovieScroll
        title="Drama Series 🎭"
        movies={dramaMovies}
        loading={loading}
      />

      {/* Top Rated Movies */}
      <HorizontalMovieScroll
        title="Top Rated ⭐"
        movies={topRatedMovies}
        loading={loading}
      />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#0d1b2a',
  },
  container: {
    flex: 1,
    backgroundColor: '#0d1b2a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profilePic: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0066cc',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0066cc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  profileText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  greeting: {
    color: '#999',
    fontSize: 12,
    fontWeight: '400',
  },
  userName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  notificationIcon: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f2438',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
    gap: 10,
    borderWidth: 1,
    borderColor: '#1a3a52',
    shadowColor: '#0066cc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  mainTitle: {
    fontSize: 36,
    color: '#fff',
    fontWeight: '600',
    lineHeight: 44,
    letterSpacing: -0.5,
  },
  mainTitleBold: {
    fontWeight: '700',
    color: '#0066cc',
  },
  genreScroll: {
    marginVertical: 16,
  },
  genreContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  genreChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: '#0f2438',
    borderWidth: 1,
    borderColor: '#1a3a52',
  },
  genreChipActive: {
    backgroundColor: '#0066cc',
    borderColor: '#0066cc',
    shadowColor: '#0066cc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  genreText: {
    color: '#999',
    fontSize: 13,
    fontWeight: '500',
  },
  genreTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
})
