/* ============================================================
   NAVBAR COMPARTILHADA
   Mostra/oculta links de acordo com o tipo de usuário logado
   e exibe as iniciais do nome no avatar.
   ============================================================ */
(function () {
  var user = JSON.parse(localStorage.getItem('usuarioLogado'));

  var navAdmin  = document.getElementById('navAdmin');
  var navLivros = document.getElementById('navLivros');
  var navAvatar = document.getElementById('navAvatar');

  if (navAdmin)  navAdmin.style.display  = (user && user.tipo === 'bibliotecario') ? '' : 'none';
  if (navLivros) navLivros.style.display = (user && user.tipo === 'bibliotecario') ? '' : 'none';

  if (navAvatar && user) {
    var partes  = user.nome.trim().split(' ');
    var iniciais = partes.length >= 2
      ? (partes[0][0] + partes[partes.length - 1][0]).toUpperCase()
      : partes[0].substring(0, 2).toUpperCase();

    navAvatar.textContent = iniciais;
    navAvatar.style.color      = 'white';
    navAvatar.style.fontWeight = '700';
    navAvatar.style.fontSize   = '0.85rem';
    navAvatar.setAttribute('aria-label', user.nome);
  }
})();
