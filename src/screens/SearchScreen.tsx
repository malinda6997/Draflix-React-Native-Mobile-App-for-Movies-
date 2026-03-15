import { tmdbApi } from '@/src/api/tmdbApi'
import { MovieCard } from '@/src/components/MovieCard'
import React, { useState } from 'react'
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

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
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    } finally {
      setLoading(false)
    }
  }

  const renderMovieGrid = () => {
    return (
      <FlatList
        data={searchResults}
        renderItem={({ item }) => <MovieCard movie={item} width={160} height={240} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        scrollEnabled={false}
        contentContainerStyle={styles.gridContainer}
      />
    )
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search movies..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        {/* Results Section */}
        {searched ? (
          <View style={styles.resultsContainer}>
            {loading ? (
              <Text style={styles.loadingText}>Searching...</Text>
            ) : searchResults.length > 0 ? (
              <>
                <Text style={styles.resultsTitle}>
                  Found {searchResults.length} movies
                </Text>
                {renderMovieGrid()}
              </>
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>No movies found</Text>
                <Text style={styles.emptyDescription}>
                  Try searching with a different query
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderTitle}>Search Movies</Text>
            <Text style={styles.placeholderDescription}>
              Type a movie name to find it
            </Text>
          </View>
        )}
      </View>
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
    paddingTop: 20,
  },
  searchBarContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#333',
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resultsTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  gridContainer: {
    paddingBottom: 20,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  loadingText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  placeholderTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  placeholderDescription: {
    color: '#666',
    fontSize: 14,
  },
})
