import { tmdbApi } from "@/src/api/tmdbApi";
import { LoadingSpinner } from "@/src/components/LoadingSpinner";
import { MovieCard } from "@/src/components/MovieCard";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, Search } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import {
    FlatList,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

const movieFetchers: { [key: string]: (page: number) => any } = {
  trending: (page) => tmdbApi.getTrendingWithPage(page),
  action: (page) => tmdbApi.getActionMoviesWithPage(page),
  comedy: (page) => tmdbApi.getComedyMoviesWithPage(page),
  drama: (page) => tmdbApi.getDramaMoviesWithPage(page),
  thriller: (page) => tmdbApi.getThrillerMoviesWithPage(page),
  horror: (page) => tmdbApi.getHorrorMoviesWithPage(page),
  romance: (page) => tmdbApi.getRomanceMoviesWithPage(page),
  adventure: (page) => tmdbApi.getAdventureMoviesWithPage(page),
  fantasy: (page) => tmdbApi.getFantasyMoviesWithPage(page),
  animation: (page) => tmdbApi.getAnimationMoviesWithPage(page),
  topRated: (page) => tmdbApi.getTopRatedWithPage(page),
};

export default function CategoryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const categoryType = params.type as string;
  const categoryName = params.name as string;

  const [movies, setMovies] = useState<any[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMovies = useCallback(async () => {
    try {
      setLoading(true);
      const fetcher = movieFetchers[categoryType];
      if (fetcher) {
        const response = await fetcher(1);
        const allMovies = response.data.results || [];
        setMovies(allMovies);
        setFilteredMovies(allMovies);
        setCurrentPage(1);
        setTotalPages(response.data.total_pages || 1);
      }
    } catch (error) {
      console.error("Error loading movies:", error);
    } finally {
      setLoading(false);
    }
  }, [categoryType]);

  React.useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  const loadMoreMovies = useCallback(async () => {
    if (loadingMore || currentPage >= totalPages) return;

    try {
      setLoadingMore(true);
      const nextPage = currentPage + 1;
      const fetcher = movieFetchers[categoryType];
      if (fetcher) {
        const response = await fetcher(nextPage);
        const newMovies = response.data.results || [];
        setMovies((prev) => [...prev, ...newMovies]);

        // Update filtered movies if search is active
        if (searchQuery.trim()) {
          const filtered = newMovies.filter((movie: any) =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
          );
          setFilteredMovies((prev) => [...prev, ...filtered]);
        } else {
          setFilteredMovies((prev) => [...prev, ...newMovies]);
        }

        setCurrentPage(nextPage);
      }
    } catch (error) {
      console.error("Error loading more movies:", error);
    } finally {
      setLoadingMore(false);
    }
  }, [currentPage, totalPages, loadingMore, categoryType, searchQuery]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === "") {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredMovies(filtered);
    }
  };

  if (loading && movies.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Movies Grid with Scrolling */}
      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        scrollEnabled={true}
        contentContainerStyle={styles.gridContainer}
        ListHeaderComponent={
          <View>
            {/* Category Title */}
            <View style={styles.titleSection}>
              <Text style={styles.categoryTitle}>{categoryName}</Text>
            </View>

            {/* Search Bar and Back Button */}
            <View style={styles.searchContainer}>
              <View style={styles.searchBarWrapper}>
                <Pressable
                  onPress={() => router.back()}
                  style={styles.backButton}
                >
                  <ChevronLeft size={24} color="#fff" />
                </Pressable>
                <View style={styles.searchBar}>
                  <Search size={20} color="#667a94" />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search movies..."
                    placeholderTextColor="#667a94"
                    value={searchQuery}
                    onChangeText={handleSearch}
                  />
                </View>
              </View>
            </View>

            {/* Results Count */}
            <Text style={styles.resultsText}>
              {filteredMovies.length}{" "}
              {filteredMovies.length === 1 ? "movie" : "movies"} found
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <MovieCard movie={item} width={150} height={225} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No movies found matching your search
          </Text>
        }
        onEndReached={loadMoreMovies}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.loadingMoreContainer}>
              <Text style={styles.loadingMoreText}>Loading more movies...</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#0a0a15",
  },
  titleSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1a3a52",
    backgroundColor: "#0a0a15",
  },
  categoryTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#0a0a15",
  },
  searchBarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#667a94",
    backgroundColor: "transparent",
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0a0f15",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: "#333333",
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
    marginLeft: 10,
    paddingVertical: 0,
    fontWeight: "500",
  },
  resultsText: {
    color: "#99b4d4",
    fontSize: 13,
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  gridContainer: {
    paddingHorizontal: 12,
    paddingBottom: 40,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  emptyText: {
    color: "#99b4d4",
    fontSize: 16,
    textAlign: "center",
    marginTop: 60,
    fontWeight: "500",
  },
  loadingMoreContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  loadingMoreText: {
    color: "#667a94",
    fontSize: 14,
    fontWeight: "500",
  },
});
