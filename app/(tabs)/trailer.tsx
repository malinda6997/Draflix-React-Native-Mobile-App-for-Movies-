import React, { useCallback, useEffect, useState } from 'react'
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { tmdbApi } from '@/src/api/tmdbApi'
import { MovieCard } from '@/src/components/MovieCard'
import { ChevronLeft } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native'

export default function TrailerScreen() {
  const navigation = useNavigation<any>()
  const [trendingMovies, setTrendingMovies] = useState<any[]>([])

  const loadMovies = useCallback(async () => {
    try {
      const response = await tmdbApi.getTrending()
      setTrendingMovies(response.data.results || [])
    } catch (error) {
      console.error('Error loading movies:', error)
    }
  }, [])

  useEffect(() => {
    loadMovies()
  }, [loadMovies])

  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <ChevronLeft size={24} color="#fff" />
        </Pressable>
        <Text style={styles.title}>Trailers</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={trendingMovies}
        renderItem={({ item }) => (
          <MovieCard movie={item} width={170} height={255} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.gridContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1e',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 217, 255, 0.1)',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  gridRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  gridContent: {
    paddingTop: 16,
    paddingBottom: 20,
  },
})
