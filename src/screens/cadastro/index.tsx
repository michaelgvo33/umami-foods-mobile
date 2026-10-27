import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { cadastrarUsuario } from "../../services/authService";

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

  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<"sucesso" | "erro" | "">("");

  function mostrarErro(texto: string) {
    setTipoMensagem("erro");
    setMensagem(texto);
  }

  async function cadastrar() {
    if (carregando) return;

    setMensagem("");
    setTipoMensagem("");

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
      mostrarErro("Preencha todos os campos obrigatórios.");
      return;
    }

    const nomeLimpo = nome.trim();
    const emailLimpo = email.trim().toLowerCase();
    const cepLimpo = cep.replace(/\D/g, "");
    const telefoneLimpo = telefone.replace(/\D/g, "");
    const estadoLimpo = estado.trim().toUpperCase();

    if (!/^[\p{L}\p{M}]+(?:[ '\u2019-][\p{L}\p{M}]+)*$/u.test(nomeLimpo)) {
      mostrarErro("Digite um nome válido, sem números.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpo)) {
      mostrarErro("Digite um e-mail válido. Exemplo: nome@email.com.");
      return;
    }

    if (
      telefoneLimpo &&
      telefoneLimpo.length !== 10 &&
      telefoneLimpo.length !== 11
    ) {
      mostrarErro("Digite um telefone com DDD e 10 ou 11 dígitos.");
      return;
    }

    if (senha.length < 8) {
      mostrarErro("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      mostrarErro("As senhas não coincidem.");
      return;
    }

    if (cepLimpo.length !== 8) {
      mostrarErro("O CEP deve conter exatamente 8 números.");
      return;
    }

    if (!/[a-zA-ZÀ-ÿ]/.test(logradouro)) {
      mostrarErro("Digite um logradouro válido, como Rua das Flores.");
      return;
    }

    if (!/\d/.test(numero)) {
      mostrarErro("O número do imóvel deve conter pelo menos um número.");
      return;
    }

    if (!/[a-zA-ZÀ-ÿ]/.test(bairro.trim())) {
      mostrarErro("Digite um nome de bairro válido.");
      return;
    }

    if (!/^[\p{L}\p{M}]+(?:[ '\u2019-][\p{L}\p{M}]+)*$/u.test(cidade.trim())) {
      mostrarErro("Digite um nome de cidade válido, sem números.");
      return;
    }

    if (!/^[A-Z]{2}$/.test(estadoLimpo)) {
      mostrarErro("Informe a sigla do estado com 2 letras, como RJ ou SP.");
      return;
    }

    const dadosCadastro = {
      nome: nomeLimpo,
      email: emailLimpo,
      telefone: telefoneLimpo,
      senha,
      confirmarSenha,
      cep: cepLimpo,
      logradouro: logradouro.trim(),
      numero: numero.trim(),
      complemento: complemento.trim(),
      bairro: bairro.trim(),
      cidade: cidade.trim(),
      estado: estadoLimpo,
    };

    try {
      setCarregando(true);

      const resposta: { mensagem?: string; erro?: string } =
        await cadastrarUsuario(dadosCadastro);

      setTipoMensagem("sucesso");
      setMensagem(resposta.mensagem || "Sua conta foi criada com sucesso!");

      setTimeout(() => {
        router.replace("/login");
      }, 2000);
    } catch (erro: unknown) {
      const mensagemErro =
        erro instanceof Error
          ? erro.message
          : "Não foi possível realizar o cadastro.";

      mostrarErro(mensagemErro);
    } finally {
      setCarregando(false);
    }
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
      maxLength?: number;
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
          autoCorrect={false}
          maxLength={opcoes.maxLength}
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

      {mensagem !== "" && (
        <View
          style={[
            styles.caixaMensagem,
            tipoMensagem === "sucesso" ? styles.caixaSucesso : styles.caixaErro,
          ]}
        >
          <Text
            style={[
              styles.textoMensagem,
              tipoMensagem === "sucesso"
                ? styles.textoSucesso
                : styles.textoErro,
            ]}
          >
            {mensagem}
          </Text>
        </View>
      )}

      <Text style={styles.tituloSecao}>Dados pessoais</Text>

      {campo(
        "Nome completo *",
        nome,
        (texto) => {
          setNome(texto.replace(/[^\p{L}\p{M} '\u2019-]/gu, ""));
        },
        "Digite seu nome",
      )}

      {campo("E-mail *", email, setEmail, "seuemail@exemplo.com", {
        teclado: "email-address",
        maiusculo: "none",
      })}

      {campo(
        "Telefone",
        telefone,
        (texto) => {
          setTelefone(texto.replace(/\D/g, "").slice(0, 11));
        },
        "DDD + número (somente números)",
        {
          teclado: "phone-pad",
          maiusculo: "none",
          maxLength: 11,
        },
      )}

      <Text style={styles.tituloSecao}>Segurança</Text>

      {campo("Senha *", senha, setSenha, "Mínimo de 8 caracteres", {
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

      {campo(
        "CEP *",
        cep,
        (texto) => {
          setCep(texto.replace(/\D/g, "").slice(0, 8));
        },
        "Somente 8 números",
        {
          teclado: "phone-pad",
          maiusculo: "none",
          maxLength: 8,
        },
      )}

      {campo(
        "Logradouro *",
        logradouro,
        setLogradouro,
        "Rua, avenida, travessa etc.",
      )}

      {campo(
        "Número *",
        numero,
        (texto) => {
          setNumero(texto.replace(/[^0-9a-zA-Z/-]/g, ""));
        },
        "Número do imóvel",
        {
          maiusculo: "none",
          maxLength: 10,
        },
      )}

      {campo(
        "Complemento",
        complemento,
        setComplemento,
        "Apartamento, bloco etc. (opcional)",
      )}

      {campo("Bairro *", bairro, setBairro, "Digite seu bairro")}

      {campo(
        "Cidade *",
        cidade,
        (texto) => {
          setCidade(texto.replace(/[^\p{L}\p{M} '\u2019-]/gu, ""));
        },
        "Digite sua cidade",
      )}

      {campo(
        "Estado *",
        estado,
        (texto) => {
          setEstado(
            texto
              .replace(/[^a-zA-Z]/g, "")
              .toUpperCase()
              .slice(0, 2),
          );
        },
        "Ex.: RJ",
        {
          maiusculo: "characters",
          maxLength: 2,
        },
      )}

      <Text style={styles.observacao}>* Campos obrigatórios</Text>

      <TouchableOpacity
        style={[styles.botao, carregando && styles.botaoDesabilitado]}
        onPress={cadastrar}
        disabled={carregando}
        activeOpacity={0.8}
      >
        <Text style={styles.textoBotao}>
          {carregando ? "CADASTRANDO..." : "CRIAR CONTA"}
        </Text>
      </TouchableOpacity>

      <View style={styles.voltarLogin}>
        <Text style={styles.textoVoltar}>Já possui uma conta? </Text>

        <TouchableOpacity
          onPress={() => router.replace("/login")}
          activeOpacity={0.7}
          disabled={carregando}
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
  caixaMensagem: {
    padding: 14,
    borderRadius: 6,
    borderWidth: 1,
    marginBottom: 12,
  },
  caixaSucesso: {
    backgroundColor: "#EAF7EE",
    borderColor: "#9BD5AB",
  },
  caixaErro: {
    backgroundColor: "#FDECEC",
    borderColor: "#E8A4A4",
  },
  textoMensagem: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "500",
  },
  textoSucesso: {
    color: "#176B35",
  },
  textoErro: {
    color: "#A11B1B",
  },
  botao: {
    height: 50,
    backgroundColor: "#B5121B",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoDesabilitado: {
    opacity: 0.6,
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
