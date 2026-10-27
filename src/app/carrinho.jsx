import { StyleSheet, Text, View } from "react-native";

export default function Carrinho() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meu Carrinho</Text>
      <Text style={styles.mensagem}>Seus produtos aparecerão aqui.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#B5121B",
    marginBottom: 12,
  },
  mensagem: {
    fontSize: 16,
    color: "#555555",
    textAlign: "center",
  },
});
