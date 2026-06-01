/* ============================================================
   PAINEL DO BIBLIOTECÁRIO
   ============================================================ */

/* ── Utilitários ── */
function formatarData(data) {
  var d = String(data.getDate()).padStart(2, '0');
  var m = String(data.getMonth() + 1).padStart(2, '0');
  var a = data.getFullYear();
  return d + '/' + m + '/' + a;
}

function getEmprestimos() {
  return JSON.parse(localStorage.getItem('emprestimos')) || [];
}

function salvarEmprestimos(lista) {
  localStorage.setItem('emprestimos', JSON.stringify(lista));
}

/* ── Toast SweetAlert2 ── */
var SwalToast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

/* ── Marca o livro como disponível ou indisponível ── */
function setLivroDisponivel(livroId, disponivel) {
  var status = JSON.parse(localStorage.getItem('livrosStatus')) || {};
  status[livroId] = disponivel;
  localStorage.setItem('livrosStatus', JSON.stringify(status));
}

/* ── Ações com confirmação via SweetAlert2 ── */
function aprovar(id) {
  Swal.fire({
    title: 'Aprovar solicitação?',
    text: 'O livro ficará indisponível e o empréstimo será ativado.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Aprovar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#16a34a',
    cancelButtonColor: '#94a3b8',
  }).then(function (result) {
    if (!result.isConfirmed) return;

    var lista = getEmprestimos();
    var item  = lista.find(function (e) { return e.id === id; });
    if (!item) return;

    var hoje      = new Date();
    var devolucao = new Date();
    devolucao.setDate(devolucao.getDate() + 14);

    item.status        = 'ativo';
    item.dataAprovacao = formatarData(hoje);
    item.dataDevolucao = formatarData(devolucao);

    setLivroDisponivel(item.livroId, false);
    salvarEmprestimos(lista);

    SwalToast.fire({ icon: 'success', title: 'Empréstimo aprovado!' });
    renderAdmin();
  });
}

function rejeitar(id) {
  Swal.fire({
    title: 'Rejeitar solicitação?',
    text: 'O usuário será informado que a solicitação foi recusada.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Rejeitar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#94a3b8',
  }).then(function (result) {
    if (!result.isConfirmed) return;

    var lista = getEmprestimos();
    var item  = lista.find(function (e) { return e.id === id; });
    if (!item) return;

    item.status = 'rejeitado';
    salvarEmprestimos(lista);

    SwalToast.fire({ icon: 'info', title: 'Solicitação rejeitada.' });
    renderAdmin();
  });
}

function devolver(id) {
  Swal.fire({
    title: 'Confirmar devolução?',
    text: 'O livro voltará a ficar disponível no acervo.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#3B4DC8',
    cancelButtonColor: '#94a3b8',
  }).then(function (result) {
    if (!result.isConfirmed) return;

    var lista = getEmprestimos();
    var item  = lista.find(function (e) { return e.id === id; });
    if (!item) return;

    item.status = 'devolvido';
    setLivroDisponivel(item.livroId, true);
    salvarEmprestimos(lista);

    SwalToast.fire({ icon: 'success', title: 'Devolução registrada!' });
    renderAdmin();
  });
}

/* ── Renderiza pendentes ── */
function renderPendentes() {
  var lista     = getEmprestimos();
  var pendentes = lista.filter(function (e) { return e.status === 'pendente'; });
  var tbody     = document.getElementById('tbody-pendentes');
  var counter   = document.getElementById('count-pendentes');

  counter.textContent = pendentes.length;

  if (pendentes.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5"><div class="empty-state"><p>Nenhuma solicitação pendente.</p></div></td></tr>';
    return;
  }

  tbody.innerHTML = pendentes.map(function (e) {
    return [
      '<tr>',
      '  <td data-label="Livro">' + e.livroTitulo + '</td>',
      '  <td data-label="Usuário">' + e.usuarioNome + '</td>',
      '  <td data-label="Solicitação">' + e.dataSolicitacao + '</td>',
      '  <td data-label="Devolução">' + e.dataDevolucao + '</td>',
      '  <td data-label="Ações">',
      '    <button class="btn-aprovar" onclick="aprovar(\'' + e.id + '\')">Aprovar</button>',
      '    <button class="btn-rejeitar" onclick="rejeitar(\'' + e.id + '\')">Rejeitar</button>',
      '  </td>',
      '</tr>',
    ].join('\n');
  }).join('');
}

/* ── Renderiza ativos ── */
function renderAtivos() {
  var lista   = getEmprestimos();
  var ativos  = lista.filter(function (e) { return e.status === 'ativo'; });
  var tbody   = document.getElementById('tbody-ativos');
  var counter = document.getElementById('count-ativos');

  counter.textContent = ativos.length;

  if (ativos.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5"><div class="empty-state"><p>Nenhum empréstimo ativo.</p></div></td></tr>';
    return;
  }

  tbody.innerHTML = ativos.map(function (e) {
    return [
      '<tr>',
      '  <td data-label="Livro">' + e.livroTitulo + '</td>',
      '  <td data-label="Usuário">' + e.usuarioNome + '</td>',
      '  <td data-label="Aprovação">' + (e.dataAprovacao || e.dataSolicitacao) + '</td>',
      '  <td data-label="Devolução">' + e.dataDevolucao + '</td>',
      '  <td data-label="Ações">',
      '    <button class="btn-devolver" onclick="devolver(\'' + e.id + '\')">Marcar como Devolvido</button>',
      '  </td>',
      '</tr>',
    ].join('\n');
  }).join('');
}

/* ── Troca de tabs ── */
document.querySelectorAll('.tab-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
    document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

/* ── Render principal ── */
function renderAdmin() {
  renderPendentes();
  renderAtivos();
}

renderAdmin();
