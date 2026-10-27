import { router } from "expo-router";

import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>UMAMI</Text>
          <Text style={styles.logoSubtitle}>FOODS</Text>
        </View>

        <Pressable
          style={styles.cartButton}
          onPress={() => router.push("/carrinho")}
        >
          <Text style={styles.cartText}>Carrinho</Text>
        </Pressable>
      </View>

      <View style={styles.welcome}>
        <Text style={styles.welcomeSubtitle}>BEM-VINDO À UMAMI FOODS</Text>

        <Text style={styles.title}>Sabores que aproximam culturas.</Text>

        <Text style={styles.description}>
          Descubra ingredientes e produtos selecionados para transformar suas
          experiências gastronômicas.
        </Text>

        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push("/catalogo")}
        >
          <Text style={styles.primaryButtonText}>Explorar catálogo</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Explore nossos produtos</Text>

        <Text style={styles.sectionDescription}>
          Ingredientes selecionados para levar mais sabor à sua cozinha.
        </Text>

        <View style={styles.productPlaceholder}>
          <Text style={styles.placeholderSymbol}>日</Text>

          <Text style={styles.placeholderTitle}>Nosso catálogo</Text>

          <Text style={styles.placeholderDescription}>
            Em breve, você poderá explorar nossos produtos diretamente por aqui.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>UMAMI FOODS</Text>

        <Text style={styles.footerDescription}>
          Tradição, qualidade e sabor.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  logo: {
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 5,
    color: "#111111",
  },

  logoSubtitle: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 5,
    color: "#B5121B",
    marginTop: 3,
  },

  cartButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#B5121B",
    borderRadius: 6,
  },

  cartText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#B5121B",
  },

  welcome: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 48,
    backgroundColor: "#FAF8F6",
  },

  welcomeSubtitle: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    color: "#B5121B",
    marginBottom: 16,
  },

  title: {
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 42,
    color: "#111111",
    marginBottom: 16,
  },

  description: {
    fontSize: 15,
    lineHeight: 24,
    color: "#666666",
    marginBottom: 26,
  },

  primaryButton: {
    backgroundColor: "#B5121B",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignSelf: "flex-start",
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  section: {
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 32,
  },

  sectionTitle: {
    fontSize: 23,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 10,
  },

  sectionDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: "#666666",
    marginBottom: 24,
  },

  productPlaceholder: {
    backgroundColor: "#F7F7F7",
    borderRadius: 8,
    padding: 28,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  placeholderSymbol: {
    fontSize: 42,
    color: "#B5121B",
    marginBottom: 14,
  },

  placeholderTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 8,
  },

  placeholderDescription: {
    fontSize: 13,
    lineHeight: 21,
    textAlign: "center",
    color: "#777777",
  },

  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    alignItems: "center",
  },

  footerText: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 3,
    color: "#111111",
  },

  footerDescription: {
    fontSize: 12,
    color: "#777777",
    marginTop: 8,
  },
});
