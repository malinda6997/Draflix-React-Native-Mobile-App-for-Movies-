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

  // Get thriller movies (genre id 53)
  getThrillerMovies: () =>
    api.get('/discover/movie', {
      params: {
        language: 'en-US',
        with_genres: '53',
        sort_by: 'popularity.desc',
      },
    }),

  // Get horror movies (genre id 27)
  getHorrorMovies: () =>
    api.get('/discover/movie', {
      params: {
        language: 'en-US',
        with_genres: '27',
        sort_by: 'popularity.desc',
      },
    }),

  // Get romance movies (genre id 10749)
  getRomanceMovies: () =>
    api.get('/discover/movie', {
      params: {
        language: 'en-US',
        with_genres: '10749',
        sort_by: 'popularity.desc',
      },
    }),

  // Get adventure movies (genre id 12)
  getAdventureMovies: () =>
    api.get('/discover/movie', {
      params: {
        language: 'en-US',
        with_genres: '12',
        sort_by: 'popularity.desc',
      },
    }),

  // Get fantasy movies (genre id 14)
  getFantasyMovies: () =>
    api.get('/discover/movie', {
      params: {
        language: 'en-US',
        with_genres: '14',
        sort_by: 'popularity.desc',
      },
    }),

  // Get animation movies (genre id 16)
  getAnimationMovies: () =>
    api.get('/discover/movie', {
      params: {
        language: 'en-US',
        with_genres: '16',
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

  // Paginated genre functions
  getTrendingWithPage: (page: number = 1) =>
    api.get('/trending/movie/week', {
      params: { language: 'en-US', page },
    }),

  getActionMoviesWithPage: (page: number = 1) =>
    api.get('/discover/movie', {
      params: {
        language: 'en-US',
        with_genres: '28',
        sort_by: 'popularity.desc',
        page,
      },
    }),

  getComedyMoviesWithPage: (page: number = 1) =>
    api.get('/discover/movie', {
      params: {
        language: 'en-US',
        with_genres: '35',
        sort_by: 'popularity.desc',
        page,
      },
    }),

  getDramaMoviesWithPage: (page: number = 1) =>
    api.get('/discover/movie', {
      params: {
        language: 'en-US',
        with_genres: '18',
        sort_by: 'popularity.desc',
        page,
      },
    }),

  getThrillerMoviesWithPage: (page: number = 1) =>
    api.get('/discover/movie', {
      params: {
        language: 'en-US',
        with_genres: '53',
        sort_by: 'popularity.desc',
        page,
      },
    }),

  getHorrorMoviesWithPage: (page: number = 1) =>
    api.get('/discover/movie', {
      params: {
        language: 'en-US',
        with_genres: '27',
        sort_by: 'popularity.desc',
        page,
      },
    }),

  getRomanceMoviesWithPage: (page: number = 1) =>
    api.get('/discover/movie', {
      params: {
        language: 'en-US',
        with_genres: '10749',
        sort_by: 'popularity.desc',
        page,
      },
    }),

  getAdventureMoviesWithPage: (page: number = 1) =>
    api.get('/discover/movie', {
      params: {
        language: 'en-US',
        with_genres: '12',
        sort_by: 'popularity.desc',
        page,
      },
    }),

  getFantasyMoviesWithPage: (page: number = 1) =>
    api.get('/discover/movie', {
      params: {
        language: 'en-US',
        with_genres: '14',
        sort_by: 'popularity.desc',
        page,
      },
    }),

  getAnimationMoviesWithPage: (page: number = 1) =>
    api.get('/discover/movie', {
      params: {
        language: 'en-US',
        with_genres: '16',
        sort_by: 'popularity.desc',
        page,
      },
    }),

  getTopRatedWithPage: (page: number = 1) =>
    api.get('/movie/top_rated', {
      params: { language: 'en-US', page },
    }),
}

export const getImageUrl = (path: string, width: number = 500) => {
  if (!path) return null
  return `https://image.tmdb.org/t/p/w${width}${path}`
}
