import { tmdbApi } from '@/src/api/tmdbApi'
import { HorizontalMovieScroll } from '@/src/components/HorizontalMovieScroll'
import { LoadingSpinner } from '@/src/components/LoadingSpinner'
import { useRouter } from 'expo-router'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native'
import { Bell, Search } from 'lucide-react-native'

export default function HomeScreen() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [trendingMovies, setTrendingMovies] = useState<any[]>([])
  const [actionMovies, setActionMovies] = useState<any[]>([])
  const [comedyMovies, setComedyMovies] = useState<any[]>([])
  const [topRatedMovies, setTopRatedMovies] = useState<any[]>([])
  const [dramaMovies, setDramaMovies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [titleIndex, setTitleIndex] = useState(0)

  const mainTitles = [
    { first: 'Discover Your Next', second: 'Favorite Movie.' },
    { first: 'Stream The Best', second: 'Movies Today.' },
    { first: 'Find Your Next', second: 'Binge Watch.' },
    { first: 'Explore Trending', second: 'Films Now.' },
  ]

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

  useEffect(() => {
    loadMovies()
  }, [loadMovies])

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prevIndex) => (prevIndex + 1) % mainTitles.length)
    }, 30000)

    return () => clearInterval(interval)
  }, [mainTitles.length])

  const handleSearchFocus = () => {
    router.push('/(tabs)/search')
  }

  if (loading && trendingMovies.length === 0) {
    return <LoadingSpinner />
  }

  const genres = [
    { name: 'Action', type: 'action' },
    { name: 'Drama', type: 'drama' },
    { name: 'Comedy', type: 'comedy' },
    { name: 'Thriller', type: 'thriller' },
    { name: 'Horror', type: 'horror' },
    { name: 'Romance', type: 'romance' },
    { name: 'Adventure', type: 'adventure' },
    { name: 'Fantasy', type: 'fantasy' },
    { name: 'Animation', type: 'animation' },
  ]

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require('../../assets/dp.png')}
            style={styles.profilePic}
          />
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>Malinda Prabath</Text>
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
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={handleSearchFocus}
          />
        </View>
      </View>

      {/* Main Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>{mainTitles[titleIndex].first}</Text>
        <Text style={[styles.mainTitle, styles.mainTitleBold]}>{mainTitles[titleIndex].second}</Text>
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
            key={genre.type}
            style={styles.genreChip}
            onPress={() => router.push({
              pathname: '/category',
              params: { name: genre.name, type: genre.type }
            } as any)}
          >
            <Text style={styles.genreText}>
              {genre.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Latest Movies */}
      <HorizontalMovieScroll
        title="Latest movies"
        movies={trendingMovies}
        loading={loading}
        onSeeMore={() => router.push({ pathname: '/category', params: { name: 'Latest movies', type: 'trending' } } as any)}
      />

      {/* Upcoming & Trending with Trailers */}
      <HorizontalMovieScroll
        title="Trending Now"
        movies={actionMovies}
        loading={loading}
        onSeeMore={() => router.push({ pathname: '/category', params: { name: 'Trending Now', type: 'action' } } as any)}
      />

      {/* Comedy Movies */}
      <HorizontalMovieScroll
        title="Comedy Pick"
        movies={comedyMovies}
        loading={loading}
        onSeeMore={() => router.push({ pathname: '/category', params: { name: 'Comedy Pick', type: 'comedy' } } as any)}
      />

      {/* Drama Movies */}
      <HorizontalMovieScroll
        title="Drama Series"
        movies={dramaMovies}
        loading={loading}
        onSeeMore={() => router.push({ pathname: '/category', params: { name: 'Drama Series', type: 'drama' } } as any)}
      />

      {/* Top Rated Movies */}
      <HorizontalMovieScroll
        title="Top Rated"
        movies={topRatedMovies}
        loading={loading}
        onSeeMore={() => router.push({ pathname: '/category', params: { name: 'Top Rated', type: 'topRated' } } as any)}
      />
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
    backgroundColor: '#FF0000',
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    resizeMode: 'cover',
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
    backgroundColor: '#0a0f15',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
    gap: 10,
    borderWidth: 1,
    borderColor: '#333333',
    shadowColor: '#FF0000',
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
    color: '#FF0000',
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
    backgroundColor: '#0a0f15',
    borderWidth: 1,
    borderColor: '#333333',
  },
  genreText: {
    color: '#999',
    fontSize: 13,
    fontWeight: '500',
  },
})
