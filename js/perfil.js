// Carrega os dados do usuário logado
var user = JSON.parse(localStorage.getItem('usuarioLogado'));

/* ── Toast SweetAlert2 ── */
var SwalToast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

if (user) {
    document.getElementById('nome').value  = user.nome  || '';
    document.getElementById('email').value = user.email || '';

    var perfilNome   = document.getElementById('perfilNome');
    var perfilTipo   = document.getElementById('perfilTipo');
    var perfilAvatar = document.getElementById('perfilAvatar');

    if (perfilNome)   perfilNome.textContent   = user.nome;
    if (perfilTipo)   perfilTipo.textContent   = user.tipo === 'bibliotecario' ? 'Bibliotecário' : 'Usuário';

    if (perfilAvatar) {
        var partes = user.nome.trim().split(' ');
        var iniciais = partes.length >= 2
            ? (partes[0][0] + partes[partes.length - 1][0]).toUpperCase()
            : partes[0].substring(0, 2).toUpperCase();
        perfilAvatar.textContent = iniciais;
    }
}

// Salvar alterações
document.getElementById('btnSalvar').addEventListener('click', function () {
    var nome           = document.getElementById('nome').value.trim();
    var email          = document.getElementById('email').value.trim();
    var senha          = document.getElementById('senha').value;
    var confirmarSenha = document.getElementById('confirmarSenha').value;

    if (!nome || !email) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos obrigatórios',
            text: 'Preencha o nome e o e-mail.',
            confirmButtonColor: '#3B4DC8',
        });
        return;
    }

    if (senha && senha !== confirmarSenha) {
        Swal.fire({
            icon: 'error',
            title: 'Senhas não coincidem',
            text: 'Verifique a nova senha e a confirmação.',
            confirmButtonColor: '#3B4DC8',
        });
        return;
    }

    // Atualiza no localStorage
    if (user) {
        user.nome  = nome;
        user.email = email;
        if (senha) user.senha = senha;
        localStorage.setItem('usuarioLogado', JSON.stringify(user));
    }

    document.getElementById('senha').value          = '';
    document.getElementById('confirmarSenha').value = '';

    SwalToast.fire({ icon: 'success', title: 'Alterações salvas com sucesso!' });

    // Atualiza o nome exibido na página
    var perfilNome   = document.getElementById('perfilNome');
    var perfilAvatar = document.getElementById('perfilAvatar');
    if (perfilNome) perfilNome.textContent = nome;
    if (perfilAvatar) {
        var partes = nome.split(' ');
        perfilAvatar.textContent = partes.length >= 2
            ? (partes[0][0] + partes[partes.length - 1][0]).toUpperCase()
            : partes[0].substring(0, 2).toUpperCase();
    }
});

// Botão de sair
var btnSair = document.getElementById('btnSair');
if (btnSair) {
    btnSair.addEventListener('click', function (e) {
        e.preventDefault();
        Swal.fire({
            title: 'Sair da conta?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sair',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#94a3b8',
        }).then(function (result) {
            if (result.isConfirmed) {
                localStorage.removeItem('usuarioLogado');
                window.location.href = 'login.html';
            }
        });
    });
}
