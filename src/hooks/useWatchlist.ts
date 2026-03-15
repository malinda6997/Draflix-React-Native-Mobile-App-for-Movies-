import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

const WATCHLIST_KEY = 'draflix_watchlist'

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  // Load watchlist on mount
  useEffect(() => {
    loadWatchlist()
  }, [])

  const loadWatchlist = async () => {
    try {
      const stored = await AsyncStorage.getItem(WATCHLIST_KEY)
      if (stored) {
        setWatchlist(JSON.parse(stored))
      }
      setLoading(false)
    } catch (error) {
      console.error('Error loading watchlist:', error)
      setLoading(false)
    }
  }

  const addToWatchlist = async (movieId: number) => {
    try {
      const updated = [...watchlist, movieId]
      setWatchlist(updated)
      await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated))
    } catch (error) {
      console.error('Error adding to watchlist:', error)
    }
  }

  const removeFromWatchlist = async (movieId: number) => {
    try {
      const updated = watchlist.filter(id => id !== movieId)
      setWatchlist(updated)
      await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated))
    } catch (error) {
      console.error('Error removing from watchlist:', error)
    }
  }

  const isInWatchlist = (movieId: number) => {
    return watchlist.includes(movieId)
  }

  const toggleWatchlist = async (movieId: number) => {
    if (isInWatchlist(movieId)) {
      await removeFromWatchlist(movieId)
    } else {
      await addToWatchlist(movieId)
    }
  }

  return {
    watchlist,
    loading,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    toggleWatchlist,
  }
}
