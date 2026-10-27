import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Splash() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>UMAMI</Text>

        <View style={styles.line} />

        <Text style={styles.subtitle}>FOODS</Text>
      </View>

      <Text style={styles.japanese}>うま味</Text>

      <Text style={styles.footer}>Distribuidora de Produtos Japoneses</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  logoContainer: {
    alignItems: "center",
  },

  logo: {
    fontSize: 42,
    fontWeight: "700",
    letterSpacing: 8,
    color: "#111111",
  },

  line: {
    width: 55,
    height: 3,
    backgroundColor: "#B5121B",
    marginVertical: 10,
  },

  subtitle: {
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 6,
    color: "#B5121B",
  },

  japanese: {
    fontSize: 24,
    marginTop: 35,
    color: "#111111",
  },

  footer: {
    position: "absolute",
    bottom: 40,
    fontSize: 12,
    color: "#666666",
  },
});
