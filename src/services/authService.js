const API_URL = "http://localhost:8080/api";

export async function fazerLogin(email, senha) {
  const resposta = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      senha,
    }),
  });

  const texto = await resposta.text();

  let dados = {};

  if (texto) {
    try {
      dados = JSON.parse(texto);
    } catch {
      dados = { mensagem: texto };
    }
  }

  if (!resposta.ok) {
    throw new Error(
      dados.mensagem || dados.erro || "Não foi possível realizar o login.",
    );
  }

  return dados;
}

export async function cadastrarUsuario(usuario) {
  const url = `${API_URL}/auth/cadastro`;

  console.log("[CADASTRO] Enviando requisição:", url);

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 15000);

  try {
    const resposta = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
      signal: controller.signal,
    });

    console.log("[CADASTRO] Status HTTP:", resposta.status);

    const texto = await resposta.text();

    console.log("[CADASTRO] Resposta da API:", texto);

    let dados = {};

    if (texto) {
      try {
        dados = JSON.parse(texto);
      } catch {
        dados = { mensagem: texto };
      }
    }

    if (!resposta.ok) {
      throw new Error(
        dados.mensagem ||
          dados.erro ||
          `Não foi possível realizar o cadastro. HTTP ${resposta.status}.`,
      );
    }

    return dados;
  } catch (erro) {
    if (erro.name === "AbortError") {
      throw new Error("A API demorou mais de 15 segundos para responder.");
    }

    throw erro;
  } finally {
    clearTimeout(timeout);
  }
}
