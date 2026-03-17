![Draflix Banner](./readme-images/readme-banner.png)

# 🎬 Draflix - Movie Discovery App

A modern cross-platform movie discovery application built with React Native and Expo. Discover movies, manage your watchlist, watch trailers, and enjoy personalized recommendations.

## ✨ Features

- **🎥 Movie Discovery** - Browse trending and popular movies
- **🔍 Advanced Search** - Search movies by title, genre, and category
- **⭐ Watchlist** - Save and manage your favorite movies locally
- **🎞️ Trailers** - Watch movie trailers directly in the app
- **📱 Responsive UI** - Optimized for iOS, Android, and Web
- **🎨 Modern Design** - Clean, intuitive interface with smooth navigation
- **⚡ Offline Support** - Persistent watchlist with AsyncStorage
- **🌓 Theme Support** - Automatic light/dark mode based on system preferences

## 🛠️ Tech Stack

- **Frontend Framework**: React Native 0.81.5
- **Development Framework**: Expo 54.0.33
- **Navigation**: Expo Router 6.0.23
- **Language**: TypeScript 5.9.2
- **State Management**: React Hooks
- **Local Storage**: AsyncStorage 2.2.0
- **API Client**: Axios 1.13.6
- **UI Components**: Lucide React Native, Expo Vector Icons
- **Video Playback**: React Native YouTube iFrame

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and npm/yarn
- **Expo CLI**: `npm install -g expo-cli`
- **iOS**: Xcode 15+ (for iOS simulator) or iPhone with Expo Go
- **Android**: Android Studio with SDK (for Android emulator)
- **TMDB API Key**: Get it from [themoviedb.org](https://www.themoviedb.org/settings/api)

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Install dependencies
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
EXPO_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
```

### 3. Run Locally

**Option 1: Expo Go on Physical Device (Recommended)**

```bash
npm start
# Scan the QR code with your iPhone using Expo Go app
# or with Android using the Expo app
```

**Option 2: iOS Simulator**

```bash
npm run ios
# Requires Xcode and macOS
```

**Option 3: Android Emulator**

```bash
npm run android
# Requires Android Studio
```

**Option 4: Web Browser**

```bash
npm run web
# Quick testing in a web browser
```

## 📁 Project Structure

```
draflix/
├── app/                          # Main app routes (Expo Router)
│   ├── (tabs)/                  # Tab navigation stack
│   │   ├── index.tsx            # Home screen
│   │   ├── search.tsx           # Search movies
│   │   ├── watchlist.tsx        # Saved movies
│   │   ├── profile.tsx          # User profile
│   │   └── trailer.tsx          # Trailer player
│   ├── category.tsx             # Category browse
│   ├── movie-detail.tsx         # Movie details
│   ├── trailer.tsx              # Trailer screen
│   └── _layout.tsx              # Root layout
│
├── src/
│   ├── api/
│   │   └── tmdbApi.ts           # TMDB API client
│   ├── components/
│   │   ├── BottomNavBar.tsx
│   │   ├── HorizontalMovieScroll.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── MovieCard.tsx
│   ├── hooks/
│   │   └── useWatchlist.ts      # Watchlist management
│   └── screens/
│       ├── HomeScreen.tsx
│       ├── SearchScreen.tsx
│       ├── WatchlistScreen.tsx
│       ├── ProfileScreen.tsx
│       ├── MovieDetailScreen.tsx
│       ├── TrailerScreen.tsx
│       └── SplashScreen.tsx
│
├── assets/                       # Images and static assets
├── components/                   # Shared UI components
├── constants/                    # App theme and constants
├── hooks/                        # Custom React hooks
└── package.json                  # Dependencies and scripts
```

## 🎯 Main Features Explained

### Home Screen

Browse trending and popular movies with horizontal scrollable categories.

### Search

Full-text search across the TMDB movie database with real-time results.

### Watchlist

- Add/remove movies to your personal watchlist
- Persistent storage using AsyncStorage
- Quick access to your saved movies

### Movie Details

- Complete movie information (synopsis, ratings, cast)
- Release date, runtime, and genres
- Related/recommended movies

### Trailers

- In-app YouTube trailer player
- Full-screen playback support

### Profile

User profile management and app settings.

## 📡 API Integration

The app uses **The Movie Database (TMDB) API** v3:

```
Base URL: https://api.themoviedb.org/3
```

**Supported Endpoints:**

- `/trending/movie/week` - Trending movies
- `/movie/popular` - Popular movies
- `/movie/{id}` - Movie details
- `/movie/{id}/videos` - Movie trailers
- `/search/movie` - Search movies
- `/discover/movie` - Discover with filters

## 🔧 Available Scripts

```bash
# Start development server with Expo
npm start

# Run on iOS simulator (macOS only)
npm run ios

# Run on Android emulator
npm run android

# Run in web browser
npm run web

# Lint code
npm lint

# Reset project to fresh state
npm run reset-project
```

## 🐛 Troubleshooting

### Android/iOS Bundling Errors

**Issue**: "Unable to resolve" module errors

```bash
# Clear cache and reinstall
npm install
npx expo start --clear
```

### AsyncStorage Not Found

Ensure the package is installed:

```bash
npm install @react-native-async-storage/async-storage@2.2.0
```

### TMDB API Errors

- Verify API key is correctly set in `.env`
- Check API rate limits (40 requests/10 seconds per IP)
- Ensure internet connectivity

### Port Already in Use

```bash
# Use a different port
npx expo start --port 8082
```

## 📱 Supported Platforms

- ✅ **iOS** 13.0+ (via Xcode or Expo Go)
- ✅ **Android** 5.0+ (via emulator or Expo Go)
- ✅ **Web** (modern browsers)

## 🔒 Security

- Sensitive credentials stored in `.env` (never commit this file)
- AsyncStorage for local-only watchlist data
- No sensitive data hardcoded in source

## 📦 Dependencies

Key packages and their purposes:

| Package                                     | Purpose                  |
| ------------------------------------------- | ------------------------ |
| `expo-router`                               | File-based routing       |
| `@react-native-async-storage/async-storage` | Persistent local storage |
| `axios`                                     | HTTP requests            |
| `react-native-youtube-iframe`               | YoutTube video embedding |
| `lucide-react-native`                       | Icon library             |

## 🚢 Deployment

### For Production Build

```bash
# iOS
eas build --platform ios --auto-submit

# Android
eas build --platform android --auto-submit
```

Requires EAS CLI and Expo account. See [Expo Deployment Guide](https://docs.expo.dev/eas/) for details.

## 📝 Environment Variables

Required `.env` file:

```env
# TMDB API Configuration
EXPO_PUBLIC_TMDB_API_KEY=your_api_key_here
EXPO_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support & Documentation

- **Main Documentation**: [IMPLEMENTATION_COMPLETE.md](./IMPLEMENTATION_COMPLETE.md)
- **Expo Docs**: [https://docs.expo.dev](https://docs.expo.dev)
- **TMDB API Docs**: [https://developer.themoviedb.org](https://developer.themoviedb.org)

## 🎉 Acknowledgments

- Built with [Expo](https://expo.dev)
- Movie data from [The Movie Database (TMDB)](https://www.themoviedb.org/)
- React Native community

---

**Happy coding! 🚀** If you encounter issues, check the troubleshooting section or refer to the detailed setup guides.
