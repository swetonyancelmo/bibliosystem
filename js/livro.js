/* ============================================================
   LÓGICA DA PÁGINA DE DETALHE DO LIVRO
   ============================================================ */

/* ── Utilitários ── */
function gerarId() {
  return Date.now().toString();
}

function formatarData(data) {
  var d = String(data.getDate()).padStart(2, '0');
  var m = String(data.getMonth() + 1).padStart(2, '0');
  var a = data.getFullYear();
  return d + '/' + m + '/' + a;
}

/* ── Toast via SweetAlert2 ── */
var SwalToast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3500,
  timerProgressBar: true,
});

function showToast(msg, icone) {
  SwalToast.fire({ icon: icone || 'info', title: msg });
}

/* ── Busca o livro pelo id da URL ── */
function getLivroPorId(id) {
  // Livros fixos (id numérico)
  var numId = parseInt(id, 10);
  if (!isNaN(numId)) {
    var fixo = LIVROS_FIXOS.find(function (l) { return l.id === numId; });
    if (fixo) {
      return Object.assign({}, fixo, { disponivel: getLivroDisponivel(numId, fixo.disponivel) });
    }
  }

  // Livros adicionados pelo bibliotecário (id "local-N")
  if (typeof id === 'string' && id.startsWith('local-')) {
    var idx = parseInt(id.replace('local-', ''), 10);
    var salvos = JSON.parse(localStorage.getItem('livros')) || [];
    var salvo  = salvos[idx];
    if (salvo) {
      return {
        id:        id,
        titulo:    salvo.titulo    || 'Sem título',
        autor:     salvo.autor     || 'Autor desconhecido',
        isbn:      salvo.isbn      || '—',
        categoria: salvo.categoria || '—',
        ano:       salvo.ano       || '—',
        descricao: salvo.descricao || '',
        coverUrl:  salvo.imagem    || '',
        disponivel: getLivroDisponivel(id, salvo.status !== 'reservado'),
      };
    }
  }

  return null;
}

/* ── Verifica se o usuário já tem solicitação pendente ou ativa para este livro ── */
function jaTemSolicitacao(livroId, usuarioNome) {
  var emprestimos = JSON.parse(localStorage.getItem('emprestimos')) || [];
  return emprestimos.some(function (e) {
    return String(e.livroId) === String(livroId) &&
           e.usuarioNome     === usuarioNome &&
           (e.status === 'pendente' || e.status === 'ativo');
  });
}

/* ── Solicita empréstimo ── */
function solicitarEmprestimo(livro) {
  var user = JSON.parse(localStorage.getItem('usuarioLogado'));
  if (!user) return;

  var hoje         = new Date();
  var devolucao    = new Date();
  devolucao.setDate(devolucao.getDate() + 14);

  var nova = {
    id:               gerarId(),
    livroId:          String(livro.id),
    livroTitulo:      livro.titulo,
    usuarioNome:      user.nome,
    status:           'pendente',
    dataSolicitacao:  formatarData(hoje),
    dataDevolucao:    formatarData(devolucao),
  };

  var emprestimos = JSON.parse(localStorage.getItem('emprestimos')) || [];
  emprestimos.push(nova);
  localStorage.setItem('emprestimos', JSON.stringify(emprestimos));

  showToast('Solicitação enviada! Aguarde a aprovação do bibliotecário.', 'success');

  // Atualiza a UI após solicitar
  setTimeout(function () { renderLivro(); }, 1500);
}

/* ── Renderiza o conteúdo do livro ── */
function renderLivro() {
  var params = new URLSearchParams(window.location.search);
  var id     = params.get('id');
  var livro  = getLivroPorId(id);
  var user   = JSON.parse(localStorage.getItem('usuarioLogado'));
  var conteudo = document.getElementById('livroConteudo');

  if (!livro) {
    conteudo.innerHTML = '<p class="carregando">Livro não encontrado.</p>';
    return;
  }

  document.title = livro.titulo + ' — BiblioSystem';

  var badgeClass = livro.disponivel ? 'badge--disponivel' : 'badge--indisponivel';
  var badgeText  = livro.disponivel ? 'Disponível' : 'Indisponível';
  var capaCover  = livro.coverUrl
    ? '<img src="' + livro.coverUrl + '" alt="Capa de ' + livro.titulo + '" />'
    : '<span class="livro-detalhe__capa-placeholder">[ Sem capa ]</span>';

  // Bloco de ação: depende do estado do livro e do usuário
  var acaoHtml = '';
  if (!user) {
    acaoHtml = '<p class="aviso-login">Faça <a href="login.html">login</a> para solicitar um empréstimo.</p>';
  } else if (user.tipo === 'bibliotecario') {
    acaoHtml = '';
  } else if (!livro.disponivel) {
    acaoHtml = '<p class="aviso-indisponivel">Este livro está indisponível no momento.</p>';
  } else if (jaTemSolicitacao(livro.id, user.nome)) {
    acaoHtml = '<p class="aviso-pendente">Você já tem uma solicitação ativa para este livro.</p>';
  } else {
    acaoHtml = '<button class="btn-solicitar" id="btnSolicitar">Solicitar Empréstimo</button>';
  }

  conteudo.innerHTML = [
    '<div class="livro-detalhe">',
    '  <div class="livro-detalhe__capa">' + capaCover + '</div>',
    '  <div class="livro-detalhe__info">',
    '    <h1 class="livro-detalhe__titulo">' + livro.titulo + '</h1>',
    '    <p class="livro-detalhe__autor">' + livro.autor + '</p>',
    '    <div class="livro-detalhe__meta">',
    '      <span class="badge ' + badgeClass + '">' + badgeText + '</span>',
    '      <span class="tag">' + formatarCategoria(livro.categoria) + '</span>',
    '    </div>',
    livro.descricao ? '    <p class="livro-detalhe__descricao">' + livro.descricao + '</p>' : '',
    '    <dl class="livro-detalhe__dados">',
    '      <dt>Autor</dt><dd>' + livro.autor + '</dd>',
    '      <dt>Ano</dt><dd>' + (livro.ano || '—') + '</dd>',
    '      <dt>ISBN</dt><dd>' + (livro.isbn || '—') + '</dd>',
    '      <dt>Categoria</dt><dd>' + formatarCategoria(livro.categoria) + '</dd>',
    '    </dl>',
    '    <div class="livro-detalhe__acoes">' + acaoHtml + '</div>',
    '  </div>',
    '</div>',
  ].join('\n');

  // Adiciona listener ao botão, se existir
  var btn = document.getElementById('btnSolicitar');
  if (btn) {
    btn.addEventListener('click', function () {
      btn.disabled = true;
      btn.textContent = 'Enviando...';
      solicitarEmprestimo(livro);
    });
  }
}

/* ── Inicializa ── */
renderLivro();
