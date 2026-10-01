import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin() {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha o e-mail e a senha.");
      return;
    }

    Alert.alert("Login", "Login realizado com sucesso!");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>UMAMI</Text>

          <View style={styles.line} />

          <Text style={styles.logoSubtitle}>FOODS</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Bem-vindo</Text>

          <Text style={styles.description}>
            Entre na sua conta para continuar.
          </Text>

          <Text style={styles.label}>E-mail</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#999999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Senha</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#999999"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <Pressable style={styles.forgotButton}>
            <Text style={styles.forgotText}>Esqueci minha senha</Text>
          </Pressable>

          <Pressable style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Entrar</Text>
          </Pressable>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Ainda não possui uma conta?</Text>

            <Pressable>
              <Text style={styles.registerLink}> Criar conta</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 45,
  },

  logo: {
    fontSize: 34,
    fontWeight: "700",
    letterSpacing: 7,
    color: "#111111",
  },

  line: {
    width: 45,
    height: 3,
    backgroundColor: "#B5121B",
    marginVertical: 8,
  },

  logoSubtitle: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 5,
    color: "#B5121B",
  },

  formContainer: {
    width: "100%",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 30,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222222",
    marginBottom: 8,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#D6D6D6",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 15,
    color: "#111111",
    marginBottom: 18,
    backgroundColor: "#FFFFFF",
  },

  forgotButton: {
    alignSelf: "flex-end",
    marginBottom: 25,
  },

  forgotText: {
    fontSize: 13,
    color: "#B5121B",
    fontWeight: "500",
  },

  loginButton: {
    height: 52,
    backgroundColor: "#B5121B",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },

  registerText: {
    fontSize: 13,
    color: "#666666",
  },

  registerLink: {
    fontSize: 13,
    color: "#B5121B",
    fontWeight: "700",
  },
});
