import { MovieCard } from '@/src/components/MovieCard'
import { useWatchlist } from '@/src/hooks/useWatchlist'
import { useRoute } from '@react-navigation/native'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'

// Mock movie data - in real app, fetch from API
const MOCK_MOVIES: { [key: number]: any } = {
  550: {
    id: 550,
    title: 'Fight Club',
    poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    vote_average: 8.8,
  },
  278: {
    id: 278,
    title: 'The Shawshank Redemption',
    poster_path: '/q6y0Go1tsGEsmJy/cbB2eWhw5h3.jpg',
    vote_average: 9.3,
  },
  238: {
    id: 238,
    title: 'The Godfather',
    poster_path: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    vote_average: 9.2,
  },
}

export default function WatchlistScreen() {
  const { watchlist } = useWatchlist()
  const [refetch, setRefetch] = useState(false)

  useFocusEffect(
    useCallback(() => {
      setRefetch(!refetch)
    }, [])
  )

  const moviesData = watchlist
    .map((id) => MOCK_MOVIES[id])
    .filter((movie) => movie !== undefined)

  const renderMovieGrid = () => {
    if (moviesData.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Your Watchlist is Empty</Text>
          <Text style={styles.emptyDescription}>
            Add movies from the Home or Search screen
          </Text>
        </View>
      )
    }

    return (
      <FlatList
        data={moviesData}
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
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>My Watchlist</Text>
        {moviesData.length > 0 && (
          <Text style={styles.count}>{moviesData.length} movies</Text>
        )}
      </View>

      {renderMovieGrid()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
  count: {
    color: '#0a7ea4',
    fontSize: 14,
    fontWeight: '600',
  },
  gridContainer: {
    paddingBottom: 20,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  emptyDescription: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },
})
