/* ── Usuários fixos do sistema ── */
const USUARIOS_FIXOS = [
  { email: 'usuario@email.com',      senha: '123456',   nome: 'Usuário Demo',  tipo: 'usuario' },
  { email: 'admin@biblioteca.com',   senha: 'admin123', nome: 'Bibliotecário', tipo: 'bibliotecario' },
];

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

/* ── Toast via SweetAlert2 ── */
const SwalToast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

function showToast(msg, icone) {
  SwalToast.fire({ icon: icone || 'info', title: msg });
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
  await new Promise(resolve => setTimeout(resolve, 1000));
  setLoading(false);

  // Verifica usuários fixos e também usuários cadastrados
  const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];
  const todosUsuarios  = [...USUARIOS_FIXOS, ...usuariosSalvos];

  const usuario = todosUsuarios.find(
    u => u.email === emailInput.value && u.senha === senhaInput.value
  );

  if (usuario) {
    localStorage.setItem('usuarioLogado', JSON.stringify({
      nome:  usuario.nome,
      email: usuario.email,
      tipo:  usuario.tipo,
    }));
    showToast("Login realizado com sucesso!", "success");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  } else {
    showToast("E-mail ou senha incorretos.", "error");
    setError(emailInput, emailError, " ");
    setError(senhaInput, senhaError, "Verifique seus dados e tente novamente.");
  }
});
