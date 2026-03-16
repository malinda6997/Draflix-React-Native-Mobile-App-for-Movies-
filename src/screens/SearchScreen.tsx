import { tmdbApi } from '@/src/api/tmdbApi'
import { MovieCard } from '@/src/components/MovieCard'
import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  FlatList,
  PanResponder,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { ChevronLeft, Search, X } from 'lucide-react-native'

export default function SearchScreen() {
  const navigation = useNavigation<any>()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>(['Interstellar', 'The Jungle', 'Wedding 99'])
  const [trendingMovies, setTrendingMovies] = useState<any[]>([])
  const [continueWatching, setContinueWatching] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  // Create panResponder with updated state using useRef
  const searchedRef = useRef(searched)
  
  // Update ref whenever searched state changes
  useEffect(() => {
    searchedRef.current = searched
  }, [searched])

  // Gesture handler for right swipe
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Only trigger on right swipe (dx > 50) and minimal vertical movement
        return Math.abs(gestureState.dx) > 50 && Math.abs(gestureState.dy) < 50
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Check if swiping right (positive dx > 50)
        if (gestureState.dx > 50) {
          // Trigger back navigation - go to home
          if (searchedRef.current) {
            // If in search results, clear search first
            setSearchQuery('')
            setSearchResults([])
            setSearched(false)
          } else {
            // If in initial screen, go to home tab
            try {
              navigation.navigate('index' as never)
            } catch (e) {
              console.log('Navigation error:', e)
            }
          }
        }
      },
    })
  )

  const loadInitialData = useCallback(async () => {
    try {
      const [trending, topRated] = await Promise.all([
        tmdbApi.getTrending(),
        tmdbApi.getTopRated(),
      ])
      setTrendingMovies(trending.data.results?.slice(0, 10) || [])
      setContinueWatching(topRated.data.results?.slice(0, 5) || [])
    } catch (error) {
      console.error('Error loading initial data:', error)
    }
  }, [])

  useEffect(() => {
    loadInitialData()
  }, [loadInitialData])

  const handleGoHome = () => {
    // Switch to home tab using tab navigator
    navigation.navigate('index' as never)
  }

  const handleSearch = async (query: string) => {
    setSearchQuery(query)

    if (query.trim().length === 0) {
      setSearchResults([])
      setSearched(false)
      return
    }

    try {
      setLoading(true)
      setSearched(true)
      const response = await tmdbApi.searchMovies(query)
      setSearchResults(response.data.results || [])
      
      // Add to recent searches
      if (!recentSearches.includes(query)) {
        setRecentSearches([query, ...recentSearches.slice(0, 4)])
      }
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleRecentSearchClick = (query: string) => {
    handleSearch(query)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
    setSearched(false)
  }

  const handleBack = () => {
    if (searched) {
      setSearchQuery('')
      setSearchResults([])
      setSearched(false)
    } else {
      handleGoHome()
    }
  }

  const renderMovieGrid = () => {
    return (
      <FlatList
        data={searchResults}
        renderItem={({ item }) => <MovieCard movie={item} width={150} height={225} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        scrollEnabled={false}
        contentContainerStyle={styles.gridContent}
      />
    )
  }

  if (searched) {
    return (
      <SafeAreaView style={styles.safeContainer} {...panResponder.current.panHandlers}>
        <View style={styles.container}>
          {/* Search Bar */}
          <View style={styles.searchBarContainer}>
            <Pressable onPress={handleBack} style={styles.backButton}>
              <ChevronLeft size={24} color="#fff" />
            </Pressable>
            <View style={styles.searchInputWrapper}>
              <Search size={18} color="#999" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#666"
                value={searchQuery}
                onChangeText={handleSearch}
                autoFocus
              />
              {searchQuery.length > 0 && (
                <Pressable onPress={clearSearch}>
                  <X size={18} color="#999" />
                </Pressable>
              )}
            </View>
          </View>

          {/* Results */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Searching...</Text>
              </View>
            ) : searchResults.length > 0 ? (
              <View style={styles.resultsSection}>
                <Text style={styles.sectionTitle}>
                  {searchResults.length} {searchResults.length === 1 ? 'Result' : 'Results'}
                </Text>
                {renderMovieGrid()}
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>No movies found</Text>
                <Text style={styles.emptyDescription}>
                  Try searching with a different query
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }

  // Initial search screen with recent searches and recommendations
  return (
    <SafeAreaView style={styles.safeContainer} {...panResponder.current.panHandlers}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Pressable onPress={handleBack} style={styles.backButton}>
            <ChevronLeft size={24} color="#fff" />
          </Pressable>
          <View style={styles.searchInputWrapper}>
            <Search size={18} color="#999" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={handleSearch}
              autoFocus
            />
          </View>
        </View>

        {/* Recent Searches */}
        <View style={styles.recentSection}>
          <View style={styles.recentHeader}>
            <Text style={styles.recentTitle}>Recent Search</Text>
            <Pressable onPress={() => setRecentSearches([])}>
              <Text style={styles.removeText}>Remove</Text>
            </Pressable>
          </View>
          <View style={styles.recentTagsContainer}>
            {recentSearches.map((search) => (
              <Pressable
                key={search}
                style={styles.recentTag}
                onPress={() => handleRecentSearchClick(search)}
              >
                <Text style={styles.recentTagText}>{search}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* For You Section */}
        <View style={styles.forYouSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>For you</Text>
            <Pressable>
              <Text style={styles.seeAllText}>See all</Text>
            </Pressable>
          </View>
          <FlatList
            data={trendingMovies.slice(0, 6)}
            renderItem={({ item }) => <MovieCard movie={item} width={160} height={240} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.gridRow}
            scrollEnabled={false}
            contentContainerStyle={styles.gridContent}
          />
        </View>

        {/* Continue Watching */}
        <View style={styles.continueSection}>
          <Text style={styles.sectionTitle}>Continue watching</Text>
          <FlatList
            data={continueWatching}
            renderItem={({ item }) => <MovieCard movie={item} width={160} height={240} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.gridRow}
            scrollEnabled={false}
            contentContainerStyle={styles.gridContent}
          />
        </View>
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
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    gap: 10,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
  
  // Recent Searches
  recentSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a2e',
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  recentTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  removeText: {
    color: '#0a7ea4',
    fontSize: 12,
    fontWeight: '600',
  },
  recentTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  recentTag: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  recentTagText: {
    color: '#ccc',
    fontSize: 13,
  },

  // For You Section
  forYouSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a2e',
  },

  // Continue Watching Section
  continueSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },

  // Section Headers
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  seeAllText: {
    color: '#0a7ea4',
    fontSize: 13,
    fontWeight: '600',
  },

  // Grid Layout
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  gridContent: {
    paddingBottom: 20,
  },
  gridContainer: {
    paddingBottom: 20,
  },

  // Loading & Empty States
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    color: '#666',
    fontSize: 14,
  },
  resultsSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  resultsTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    gap: 8,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  emptyDescription: {
    color: '#666',
    fontSize: 14,
  },
})
