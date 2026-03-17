import { Image } from "expo-image";
import * as navigationBar from "expo-navigation-bar";
import { useRouter } from "expo-router";
import * as splashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import {
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Keep the splash screen visible while we load
splashScreen.preventAutoHideAsync();

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Hide the splash screen after component mounts
    const hideSplashScreen = async () => {
      try {
        // Set navigation bar color on Android
        if (Platform.OS === "android") {
          await navigationBar.setBackgroundColorAsync("#0a0a15");
          await navigationBar.setPositionAsync("absolute");
        }
        // Hide the expo splash screen
        await splashScreen.hideAsync();
      } catch (error) {
        console.error("Error hiding splash screen:", error);
      }
    };

    // Delay the splash screen hiding slightly for better UX
    const timer = setTimeout(hideSplashScreen, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleStartNow = () => {
    router.push("/(tabs)");
  };

  return (
    <ImageBackground
      source={require("../../assets/background-spalsh.jpg")}
      style={styles.container}
    >
      {/* Dark Overlay */}
      <View style={styles.overlay} />

      <View style={styles.content}>
        {/* Logo Image Section */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo-spash.png")}
            style={styles.logoImage}
            contentFit="contain"
          />
        </View>
      </View>

      {/* Text Section Near Button */}
      <View style={styles.textBottomSection}>
        {/* Main Bold Text */}
        <Text style={styles.slogan}>
          Stream Your Favorite Movies Anytime, Anywhere
        </Text>

        {/* Hero Text */}
        <Text style={styles.heroDescription}>
          Discover trending films, build your watchlist, and never miss a
          blockbuster
        </Text>
      </View>

      {/* Get Started Button */}
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.startButton,
            pressed && styles.startButtonPressed,
          ]}
          onPress={handleStartNow}
        >
          <Text style={styles.startButtonText}>Get Started</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(86, 44, 8, 0.5)",
    zIndex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 80,
    zIndex: 2,
  },
  textBottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginBottom: 30,
    zIndex: 2,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  logoImage: {
    width: 160,
    height: 160,
    borderRadius: 24,
  },
  mainTextSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  mainTitle: {
    fontSize: 50,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: 4,
    marginBottom: 12,
  },
  slogan: {
    fontSize: 42,
    color: "#fff",
    textAlign: "left",
    fontWeight: "700",
    marginBottom: 12,
    lineHeight: 50,
  },
  subtitle: {
    fontSize: 10,
    color: "#0a7ea4",
    marginTop: 8,
    fontWeight: "600",
    letterSpacing: 1,
  },
  heroSection: {
    alignItems: "center",
    gap: 16,
  },
  heroTitle: {
    fontSize: 32,
    color: "#ccc",
    fontWeight: "600",
  },
  heroDescription: {
    fontSize: 14,
    color: "#e1e1e1",
    textAlign: "left",
    fontWeight: "500",
  },
  buttonContainer: {
    paddingBottom: 50,
    alignItems: "center",
    gap: 12,
    zIndex: 2,
  },
  startButton: {
    backgroundColor: "#E50914",
    paddingHorizontal: 120,
    paddingVertical: 20,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  startButtonPressed: {
    opacity: 0.8,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 1,
  },
  disclaimerText: {
    color: "#666",
    fontSize: 12,
  },
});
