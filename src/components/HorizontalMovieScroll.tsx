import { MovieCard } from './MovieCard'
import React from 'react'
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native'

interface HorizontalMovieScrollProps {
  title: string
  movies: any[]
  loading?: boolean
  onSeeMore?: () => void
}

export const HorizontalMovieScroll: React.FC<HorizontalMovieScrollProps> = ({
  title,
  movies,
  loading = false,
  onSeeMore,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{title}</Text>
        {onSeeMore && (
          <Pressable style={styles.seeMoreButton} onPress={onSeeMore}>
            <Text style={styles.seeMoreText}>See more</Text>
          </Pressable>
        )}
      </View>
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
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
  },
  seeMoreButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  seeMoreText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
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
