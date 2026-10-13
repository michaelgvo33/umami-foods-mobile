import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function CadastroScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  function cadastrar() {
    if (
      !nome.trim() ||
      !email.trim() ||
      !senha ||
      !confirmarSenha ||
      !cep.trim() ||
      !logradouro.trim() ||
      !numero.trim() ||
      !bairro.trim() ||
      !cidade.trim() ||
      !estado.trim()
    ) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Atenção", "As senhas não coincidem.");
      return;
    }

    // Dados organizados para a futura integração com a API.
    const dadosCadastro = {
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      telefone: telefone.trim() || null,
      senha: senha,
      endereco: {
        cep: cep.trim(),
        logradouro: logradouro.trim(),
        numero: numero.trim(),
        complemento: complemento.trim() || null,
        bairro: bairro.trim(),
        cidade: cidade.trim(),
        estado: estado.trim().toUpperCase(),
      },
    };

    // A API será conectada posteriormente.
    // Não enviar a senha para console.log.

    Alert.alert(
      "Cadastro",
      "Dados validados! A integração com a API será feita posteriormente.",
    );
  }

  function campo(
    titulo: string,
    valor: string,
    alterar: (texto: string) => void,
    placeholder: string,
    opcoes: {
      senha?: boolean;
      teclado?: "default" | "email-address" | "phone-pad";
      maiusculo?: "none" | "sentences" | "words" | "characters";
    } = {},
  ) {
    return (
      <View style={styles.campo}>
        <Text style={styles.label}>{titulo}</Text>

        <TextInput
          style={styles.input}
          value={valor}
          onChangeText={alterar}
          placeholder={placeholder}
          placeholderTextColor="#999999"
          secureTextEntry={opcoes.senha}
          keyboardType={opcoes.teclado || "default"}
          autoCapitalize={opcoes.maiusculo || "sentences"}
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.cabecalho}>
        <Text style={styles.logo}>UMAMI</Text>
        <View style={styles.linha} />
        <Text style={styles.subtituloLogo}>FOODS</Text>
      </View>

      <Text style={styles.titulo}>Criar conta</Text>

      <Text style={styles.descricao}>
        Cadastre-se para acessar nossos produtos.
      </Text>

      <Text style={styles.tituloSecao}>Dados pessoais</Text>

      {campo("Nome completo *", nome, setNome, "Digite seu nome")}

      {campo("E-mail *", email, setEmail, "seuemail@exemplo.com", {
        teclado: "email-address",
        maiusculo: "none",
      })}

      {campo("Telefone", telefone, setTelefone, "(21) 99999-9999", {
        teclado: "phone-pad",
      })}

      <Text style={styles.tituloSecao}>Segurança</Text>

      {campo("Senha *", senha, setSenha, "Crie uma senha", {
        senha: true,
        maiusculo: "none",
      })}

      {campo(
        "Confirmar senha *",
        confirmarSenha,
        setConfirmarSenha,
        "Digite a senha novamente",
        {
          senha: true,
          maiusculo: "none",
        },
      )}

      <Text style={styles.tituloSecao}>Endereço</Text>

      {campo("CEP *", cep, setCep, "Digite seu CEP")}

      {campo("Logradouro *", logradouro, setLogradouro, "Rua, avenida etc.")}

      {campo("Número *", numero, setNumero, "Número do imóvel")}

      {campo(
        "Complemento",
        complemento,
        setComplemento,
        "Apartamento, bloco etc. (opcional)",
      )}

      {campo("Bairro *", bairro, setBairro, "Digite seu bairro")}

      {campo("Cidade *", cidade, setCidade, "Digite sua cidade")}

      {campo("Estado *", estado, setEstado, "Ex.: RJ", {
        maiusculo: "characters",
      })}

      <Text style={styles.observacao}>* Campos obrigatórios</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={cadastrar}
        activeOpacity={0.8}
      >
        <Text style={styles.textoBotao}>CRIAR CONTA</Text>
      </TouchableOpacity>

      <View style={styles.voltarLogin}>
        <Text style={styles.textoVoltar}>Já possui uma conta? </Text>

        <TouchableOpacity
          onPress={() => router.replace("/login")}
          activeOpacity={0.7}
        >
          <Text style={styles.linkLogin}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.rodape}>
        UMAMI FOODS · Distribuidora de Produtos Japoneses
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  conteudo: {
    paddingHorizontal: 24,
    paddingTop: 35,
    paddingBottom: 35,
  },

  cabecalho: {
    alignItems: "center",
    marginBottom: 30,
  },

  logo: {
    fontSize: 30,
    fontWeight: "700",
    letterSpacing: 6,
    color: "#111111",
  },

  linha: {
    width: 45,
    height: 3,
    backgroundColor: "#B5121B",
    marginVertical: 6,
  },

  subtituloLogo: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 5,
    color: "#B5121B",
  },

  titulo: {
    fontSize: 27,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 8,
  },

  descricao: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 25,
  },

  tituloSecao: {
    fontSize: 17,
    fontWeight: "700",
    color: "#B5121B",
    marginTop: 20,
    marginBottom: 15,
  },

  campo: {
    marginBottom: 15,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222222",
    marginBottom: 7,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#111111",
    backgroundColor: "#FFFFFF",
  },

  observacao: {
    fontSize: 12,
    color: "#777777",
    marginTop: 5,
    marginBottom: 18,
  },

  botao: {
    height: 50,
    backgroundColor: "#B5121B",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
  },

  voltarLogin: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  textoVoltar: {
    fontSize: 13,
    color: "#666666",
  },

  linkLogin: {
    fontSize: 13,
    color: "#B5121B",
    fontWeight: "700",
  },

  rodape: {
    marginTop: 25,
    textAlign: "center",
    fontSize: 11,
    color: "#888888",
  },
});
