import { MovieCard } from './MovieCard'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

interface HorizontalMovieScrollProps {
  title: string
  movies: any[]
  loading?: boolean
}

export const HorizontalMovieScroll: React.FC<HorizontalMovieScrollProps> = ({
  title,
  movies,
  loading = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <>
            {movies && movies.length > 0 ? (
              movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} width={150} height={225} />
              ))
            ) : (
              <Text style={styles.emptyText}>No movies available</Text>
            )}
          </>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    marginHorizontal: 20,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  loadingText: {
    color: '#666',
    fontSize: 14,
  },
  emptyText: {
    color: '#666',
    fontSize: 14,
  },
})
