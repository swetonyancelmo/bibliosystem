/* ── Elementos ── */
const form            = document.getElementById("cadastroForm");
const nomeInput       = document.getElementById("nome");
const emailInput      = document.getElementById("email");
const senhaInput      = document.getElementById("senha");
const confirmarInput  = document.getElementById("confirmar");

const nomeError       = document.getElementById("nomeError");
const emailError      = document.getElementById("emailError");
const senhaError      = document.getElementById("senhaError");
const confirmarError  = document.getElementById("confirmarError");

const btnCriar        = document.getElementById("btnCriar");
const toast           = document.getElementById("toast");

/* ── Validações ── */
function validarNome(valor) {
  if (!valor.trim()) return "O nome é obrigatório.";
  if (valor.trim().length < 3) return "Informe o nome completo.";
  return "";
}

function validarEmail(valor) {
  if (!valor.trim()) return "O e-mail é obrigatório.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) return "Informe um e-mail válido.";
  return "";
}

function validarSenha(valor) {
  if (!valor) return "A senha é obrigatória.";
  if (valor.length < 6) return "A senha deve ter pelo menos 6 caracteres.";
  return "";
}

function validarConfirmar(valor) {
  if (!valor) return "Confirme sua senha.";
  if (valor !== senhaInput.value) return "As senhas não coincidem.";
  return "";
}

/* ── Exibir / limpar erro ── */
function setError(input, errorEl, msg) {
  errorEl.textContent = msg;
  if (msg) {
    input.classList.add("input-error");
  } else {
    input.classList.remove("input-error");
  }
}

/* ── Validação ao sair do campo (blur) ── */
nomeInput.addEventListener("blur", () =>
  setError(nomeInput, nomeError, validarNome(nomeInput.value)));

emailInput.addEventListener("blur", () =>
  setError(emailInput, emailError, validarEmail(emailInput.value)));

senhaInput.addEventListener("blur", () =>
  setError(senhaInput, senhaError, validarSenha(senhaInput.value)));

confirmarInput.addEventListener("blur", () =>
  setError(confirmarInput, confirmarError, validarConfirmar(confirmarInput.value)));

/* ── Revalidação em tempo real ao digitar (após primeiro erro) ── */
nomeInput.addEventListener("input", () => {
  if (nomeInput.classList.contains("input-error"))
    setError(nomeInput, nomeError, validarNome(nomeInput.value));
});

emailInput.addEventListener("input", () => {
  if (emailInput.classList.contains("input-error"))
    setError(emailInput, emailError, validarEmail(emailInput.value));
});

senhaInput.addEventListener("input", () => {
  if (senhaInput.classList.contains("input-error"))
    setError(senhaInput, senhaError, validarSenha(senhaInput.value));
  // Revalida confirmação se já foi tocada
  if (confirmarInput.classList.contains("input-error"))
    setError(confirmarInput, confirmarError, validarConfirmar(confirmarInput.value));
});

confirmarInput.addEventListener("input", () => {
  if (confirmarInput.classList.contains("input-error"))
    setError(confirmarInput, confirmarError, validarConfirmar(confirmarInput.value));
});

/* ── Toggle mostrar/ocultar senha ── */
function criarToggle(btnId, inputEl, iconId) {
  const btn  = document.getElementById(btnId);
  const icon = document.getElementById(iconId);

  btn.addEventListener("click", () => {
    const visivel = inputEl.type === "text";
    inputEl.type  = visivel ? "password" : "text";

    icon.innerHTML = visivel
      ? /* olho aberto */`
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>`
      : /* olho fechado */`
          <line x1="2" y1="2" x2="22" y2="22"/>
          <path d="M6.7 6.7A9.77 9.77 0 0 0 1 12s4 8 11 8a9.9 9.9 0 0 0 5.3-1.5"/>
          <path d="M10.6 5.1A9.2 9.2 0 0 1 12 5c7 0 11 7 11 7a18.5 18.5 0 0 1-2.2 3"/>
          <circle cx="12" cy="12" r="3"/>`;
  });
}

criarToggle("toggleSenha",    senhaInput,    "eyeSenha");
criarToggle("toggleConfirmar", confirmarInput, "eyeConfirmar");

/* ── Toast ── */
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

/* ── Loading state ── */
function setLoading(ativo) {
  btnCriar.disabled    = ativo;
  btnCriar.textContent = ativo ? "Criando conta..." : "Criar conta";
}

/* ── Submit ── */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const erros = {
    nome:      validarNome(nomeInput.value),
    email:     validarEmail(emailInput.value),
    senha:     validarSenha(senhaInput.value),
    confirmar: validarConfirmar(confirmarInput.value),
  };

  setError(nomeInput,      nomeError,      erros.nome);
  setError(emailInput,     emailError,     erros.email);
  setError(senhaInput,     senhaError,     erros.senha);
  setError(confirmarInput, confirmarError, erros.confirmar);

  const temErro = Object.values(erros).some(e => e !== "");
  if (temErro) return;

  setLoading(true);

  // Simula chamada de API (substituir pela requisição real)
  await new Promise(resolve => setTimeout(resolve, 1500));

  setLoading(false);
  showToast("✅ Conta criada com sucesso!");

  setTimeout(() => {
    // Redirecionar para login após cadastro
    // window.location.href = "login.html";
    showToast("🔀 Redirecionando para o login...");
  }, 1500);
});