/* ── Elementos ── */
const form       = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
const emailError = document.getElementById("emailError");
const senhaError = document.getElementById("senhaError");
const togglePw   = document.getElementById("togglePw");
const btnEntrar  = document.getElementById("btnEntrar");
const toast      = document.getElementById("toast");

/* ── Validações ── */
function validarEmail(valor) {
  if (!valor.trim()) return "O e-mail é obrigatório.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) return "Informe um e-mail válido.";
  return "";
}

function validarSenha(valor) {
  if (!valor.trim()) return "A senha é obrigatória.";
  if (valor.length < 6) return "A senha deve ter pelo menos 6 caracteres.";
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

/* ── Validação em tempo real (ao sair do campo) ── */
emailInput.addEventListener("blur", () => {
  setError(emailInput, emailError, validarEmail(emailInput.value));
});

senhaInput.addEventListener("blur", () => {
  setError(senhaInput, senhaError, validarSenha(senhaInput.value));
});

/* ── Limpar erro ao digitar ── */
emailInput.addEventListener("input", () => {
  if (emailInput.classList.contains("input-error")) {
    setError(emailInput, emailError, validarEmail(emailInput.value));
  }
});

senhaInput.addEventListener("input", () => {
  if (senhaInput.classList.contains("input-error")) {
    setError(senhaInput, senhaError, validarSenha(senhaInput.value));
  }
});

/* ── Mostrar / ocultar senha ── */
togglePw.addEventListener("click", () => {
  const visivel = senhaInput.type === "text";
  senhaInput.type = visivel ? "password" : "text";

  // Trocar ícone
  const eyeIcon = document.getElementById("eyeIcon");
  if (visivel) {
    eyeIcon.innerHTML = `
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    `;
  } else {
    eyeIcon.innerHTML = `
      <line x1="2" y1="2" x2="22" y2="22"/>
      <path d="M6.7 6.7A9.77 9.77 0 0 0 1 12s4 8 11 8a9.9 9.9 0 0 0 5.3-1.5"/>
      <path d="M10.6 5.1A9.2 9.2 0 0 1 12 5c7 0 11 7 11 7a18.5 18.5 0 0 1-2.2 3"/>
      <circle cx="12" cy="12" r="3"/>
    `;
  }
});

/* ── Toast ── */
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

/* ── Loading state ── */
function setLoading(ativo) {
  btnEntrar.disabled = ativo;
  btnEntrar.textContent = ativo ? "Entrando..." : "Entrar";
}

/* ── Submit ── */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const erroEmail = validarEmail(emailInput.value);
  const erroSenha = validarSenha(senhaInput.value);

  setError(emailInput, emailError, erroEmail);
  setError(senhaInput, senhaError, erroSenha);

  if (erroEmail || erroSenha) return;

  setLoading(true);

  // Simula chamada de API (substituir pela requisição real)
  await new Promise(resolve => setTimeout(resolve, 1500));

  setLoading(false);

  // Credenciais de teste
  const emailValido = "usuario@email.com";
  const senhaValida = "123456";

  if (emailInput.value === emailValido && senhaInput.value === senhaValida) {
    showToast("✅ Login realizado com sucesso!");
    setTimeout(() => {
      // Redirecionar para a tela de catálogo
      // window.location.href = "index.html";
      showToast("🔀 Redirecionando para o catálogo...");
    }, 1500);
  } else {
    showToast("❌ E-mail ou senha incorretos.");
    setError(emailInput, emailError, " ");
    setError(senhaInput, senhaError, "Verifique seus dados e tente novamente.");
  }
});