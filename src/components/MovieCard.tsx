import { getImageUrl } from '@/src/api/tmdbApi'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

interface MovieCardProps {
  movie: any
  width?: number
  height?: number
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  width = 150,
  height = 225,
}) => {
  const router = useRouter()

  const handlePress = () => {
    router.push({
      pathname: '/movie-detail',
      params: { movieId: movie.id },
    })
  }

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        {
          width,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      onPress={handlePress}
    >
      <Image
        source={{ uri: getImageUrl(movie.poster_path, 300) }}
        style={[styles.poster, { width, height }]}
      />
      <Text numberOfLines={2} style={styles.title}>
        {movie.title}
      </Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>⭐ {movie.vote_average?.toFixed(1)}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    marginRight: 12,
  },
  poster: {
    borderRadius: 12,
    backgroundColor: '#1a1a1a',
  },
  title: {
    color: '#fff',
    fontSize: 12,
    marginTop: 8,
    fontWeight: '600',
  },
  ratingContainer: {
    marginTop: 4,
  },
  rating: {
    color: '#ffd700',
    fontSize: 11,
    fontWeight: '600',
  },
})
