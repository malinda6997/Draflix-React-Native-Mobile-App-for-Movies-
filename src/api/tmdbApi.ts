import axios from 'axios'

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
})

export const tmdbApi = {
  // Get trending movies
  getTrending: () =>
    api.get('/trending/movie/week', {
      params: { language: 'en-US' },
    }),

  // Get movies by category
  getMoviesByCategory: (genre: string) =>
    api.get('/discover/movie', {
      params: {
        language: 'en-US',
        with_genres: genre,
        sort_by: 'popularity.desc',
      },
    }),

  // Search movies
  searchMovies: (query: string) =>
    api.get('/search/movie', {
      params: {
        language: 'en-US',
        query,
        page: 1,
      },
    }),

  // Get movie details
  getMovieDetails: (movieId: number) =>
    api.get(`/movie/${movieId}`, {
      params: { language: 'en-US' },
    }),

  // Get similar movies
  getSimilarMovies: (movieId: number) =>
    api.get(`/movie/${movieId}/similar`, {
      params: { language: 'en-US' },
    }),

  // Get movie videos/trailers
  getMovieVideos: (movieId: number) =>
    api.get(`/movie/${movieId}/videos`, {
      params: { language: 'en-US' },
    }),

  // Get action movies (genre id 28)
  getActionMovies: () =>
    api.get('/discover/movie', {
      params: {
        language: 'en-US',
        with_genres: '28',
        sort_by: 'popularity.desc',
      },
    }),

  // Get comedy movies (genre id 35)
  getComedyMovies: () =>
    api.get('/discover/movie', {
      params: {
        language: 'en-US',
        with_genres: '35',
        sort_by: 'popularity.desc',
      },
    }),

  // Get drama movies (genre id 18)
  getDramaMovies: () =>
    api.get('/discover/movie', {
      params: {
        language: 'en-US',
        with_genres: '18',
        sort_by: 'popularity.desc',
      },
    }),

  // Get sci-fi movies (genre id 878)
  getSciFiMovies: () =>
    api.get('/discover/movie', {
      params: {
        language: 'en-US',
        with_genres: '878',
        sort_by: 'popularity.desc',
      },
    }),

  // Get top-rated movies
  getTopRated: () =>
    api.get('/movie/top_rated', {
      params: { language: 'en-US' },
    }),

  // Get popular movies
  getPopular: () =>
    api.get('/movie/popular', {
      params: { language: 'en-US' },
    }),
}

export const getImageUrl = (path: string, width: number = 500) => {
  if (!path) return null
  return `https://image.tmdb.org/t/p/w${width}${path}`
}
