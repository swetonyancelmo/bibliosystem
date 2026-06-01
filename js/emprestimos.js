/* ============================================================
   MEUS EMPRÉSTIMOS — lê dados do localStorage
   ============================================================ */

function getEmprestimosDoUsuario() {
    var user = JSON.parse(localStorage.getItem('usuarioLogado'));
    var todos = JSON.parse(localStorage.getItem('emprestimos')) || [];

    if (!user) return [];

    // Filtra apenas os empréstimos do usuário logado
    return todos.filter(function (e) {
        return e.usuarioNome === user.nome;
    });
}

function statusBadge(status) {
    var map = {
        'pendente':  'badge--pendente',
        'ativo':     'badge--ativo',
        'devolvido': 'badge--devolvido',
        'rejeitado': 'badge--rejeitado',
    };
    var textos = {
        'pendente':  'Pendente',
        'ativo':     'Ativo',
        'devolvido': 'Devolvido',
        'rejeitado': 'Rejeitado',
    };
    return '<span class="badge ' + (map[status] || '') + '">' + (textos[status] || status) + '</span>';
}

function renderPendentes() {
    var todos     = getEmprestimosDoUsuario();
    var pendentes = todos.filter(function (e) { return e.status === 'pendente'; });
    var tbody     = document.getElementById('tbody-pendentes');
    var counter   = document.getElementById('count-pendentes');

    counter.textContent = pendentes.length;

    if (pendentes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4"><div class="empty-state"><p>Nenhuma solicitação pendente.</p></div></td></tr>';
        return;
    }

    tbody.innerHTML = pendentes.map(function (e) {
        return [
            '<tr>',
            '  <td data-label="Livro">' + e.livroTitulo + '</td>',
            '  <td data-label="Solicitação">' + e.dataSolicitacao + '</td>',
            '  <td data-label="Devolução Prevista">' + e.dataDevolucao + '</td>',
            '  <td data-label="Status">' + statusBadge(e.status) + '</td>',
            '</tr>',
        ].join('\n');
    }).join('');
}

function renderAtivos() {
    var todos   = getEmprestimosDoUsuario();
    var ativos  = todos.filter(function (e) { return e.status === 'ativo'; });
    var tbody   = document.getElementById('tbody-ativos');
    var counter = document.getElementById('count-ativos');

    counter.textContent = ativos.length;

    if (ativos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4"><div class="empty-state"><p>Nenhum empréstimo ativo.</p></div></td></tr>';
        return;
    }

    tbody.innerHTML = ativos.map(function (e) {
        return [
            '<tr>',
            '  <td data-label="Livro">' + e.livroTitulo + '</td>',
            '  <td data-label="Aprovado em">' + (e.dataAprovacao || e.dataSolicitacao) + '</td>',
            '  <td data-label="Devolução">' + e.dataDevolucao + '</td>',
            '  <td data-label="Status">' + statusBadge(e.status) + '</td>',
            '</tr>',
        ].join('\n');
    }).join('');
}

function renderHistorico() {
    var todos     = getEmprestimosDoUsuario();
    var historico = todos.filter(function (e) {
        return e.status === 'devolvido' || e.status === 'rejeitado';
    });
    var tbody = document.getElementById('tbody-historico');

    if (historico.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4"><div class="empty-state"><p>Nenhum empréstimo no histórico.</p></div></td></tr>';
        return;
    }

    tbody.innerHTML = historico.map(function (e) {
        return [
            '<tr>',
            '  <td data-label="Livro">' + e.livroTitulo + '</td>',
            '  <td data-label="Solicitação">' + e.dataSolicitacao + '</td>',
            '  <td data-label="Devolução">' + e.dataDevolucao + '</td>',
            '  <td data-label="Status">' + statusBadge(e.status) + '</td>',
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

/* ── Inicializa ── */
renderPendentes();
renderAtivos();
renderHistorico();
