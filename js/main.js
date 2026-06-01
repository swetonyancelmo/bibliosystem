/* ============================================================
   CATÁLOGO — usa os livros de livros-data.js
   ============================================================ */

/* ── Carrega livros adicionados pelo bibliotecário ── */
function carregarLivrosDoStorage() {
  var salvos = JSON.parse(localStorage.getItem('livros')) || [];
  return salvos.map(function (livro, index) {
    var id = 'local-' + index;
    return {
      id:        id,
      titulo:    livro.titulo    || 'Sem título',
      autor:     livro.autor     || 'Autor desconhecido',
      isbn:      livro.isbn      || '',
      categoria: livro.categoria || '',
      ano:       livro.ano       || '',
      disponivel: getLivroDisponivel(id, livro.status !== 'reservado'),
      descricao:  livro.descricao || '',
      coverUrl:   livro.imagem   || '',
    };
  });
}

/* Todos os livros = fixos (com disponibilidade dinâmica) + salvos */
var LIVROS_FIXOS_COM_STATUS = LIVROS_FIXOS.map(function (l) {
  return Object.assign({}, l, { disponivel: getLivroDisponivel(l.id, l.disponivel) });
});

var ALL_BOOKS    = LIVROS_FIXOS_COM_STATUS.concat(carregarLivrosDoStorage());
var currentBooks = ALL_BOOKS.slice();
var selectedCategory = '';

/* ── Elementos do DOM ── */
var searchInput   = document.getElementById('searchInput');
var searchBtn     = document.getElementById('searchBtn');
var categoryBtn   = document.getElementById('categoryBtn');
var categoryLabel = document.getElementById('categoryLabel');
var categoryMenu  = document.getElementById('categoryMenu');
var booksGrid     = document.getElementById('booksGrid');
var booksCount    = document.getElementById('booksCount');
var booksEmpty    = document.getElementById('booksEmpty');

/* ── Renderização ── */
function renderBooks(books) {
  booksGrid.innerHTML = '';

  if (books.length === 0) {
    booksEmpty.hidden = false;
    booksCount.textContent = '0 livros encontrados';
    return;
  }

  booksEmpty.hidden = true;
  booksCount.textContent = books.length + ' livro' + (books.length !== 1 ? 's' : '') +
    ' encontrado' + (books.length !== 1 ? 's' : '');

  books.forEach(function (book) {
    booksGrid.appendChild(buildCard(book));
  });
}

function buildCard(book) {
  var card = document.createElement('article');
  card.className  = 'book-card';
  card.dataset.id = book.id;

  var detalhesUrl = 'livro.html?id=' + book.id;
  var badgeClass  = book.disponivel ? 'badge--disponivel' : 'badge--indisponivel';
  var badgeText   = book.disponivel ? 'Disponível' : 'Indisponível';
  var actionBtn   = book.disponivel
    ? '<a href="' + detalhesUrl + '" class="btn btn--primary">Emprestar</a>'
    : '<span class="book-card__status-indisponivel">Indisponível</span>';

  card.innerHTML = [
    '<a href="' + detalhesUrl + '" class="book-card__cover" aria-label="Ver detalhes de ' + book.titulo + '">',
    book.coverUrl
      ? '  <img src="' + book.coverUrl + '" alt="Capa de ' + book.titulo + '" loading="lazy" />'
      : '  <span class="book-card__cover-placeholder">[ Capa ]</span>',
    '</a>',
    '<div class="book-card__body">',
    '  <span class="badge ' + badgeClass + '">' + badgeText + '</span>',
    '  <a href="' + detalhesUrl + '" class="book-card__title">' + book.titulo + '</a>',
    '  <p class="book-card__author">' + book.autor + '</p>',
    '  <span class="tag">' + formatarCategoria(book.categoria) + '</span>',
    '</div>',
    '<div class="book-card__footer">' + actionBtn + '</div>',
  ].join('\n');

  return card;
}

/* ── Busca e filtro ── */
function filterBooks() {
  var query = searchInput.value.trim().toLowerCase();

  currentBooks = ALL_BOOKS.filter(function (book) {
    var matchCategory = !selectedCategory || book.categoria === selectedCategory;
    var matchQuery    = !query
      || book.titulo.toLowerCase().includes(query)
      || book.autor.toLowerCase().includes(query)
      || (book.isbn && book.isbn.includes(query));
    return matchCategory && matchQuery;
  });

  renderBooks(currentBooks);
}

searchBtn.addEventListener('click', filterBooks);
searchInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') filterBooks(); });

/* ── Dropdown de categoria ── */
categoryBtn.addEventListener('click', function (e) {
  e.stopPropagation();
  var isOpen = categoryMenu.classList.toggle('is-open');
  categoryBtn.setAttribute('aria-expanded', isOpen);
});

document.addEventListener('click', function () {
  categoryMenu.classList.remove('is-open');
  categoryBtn.setAttribute('aria-expanded', false);
});

categoryMenu.querySelectorAll('.dropdown__item').forEach(function (item) {
  item.addEventListener('click', function () {
    selectedCategory = item.dataset.value;
    categoryLabel.textContent = item.textContent;

    categoryMenu.querySelectorAll('.dropdown__item').forEach(function (i) {
      i.classList.remove('is-selected');
    });
    item.classList.add('is-selected');

    categoryMenu.classList.remove('is-open');
    categoryBtn.setAttribute('aria-expanded', false);
    filterBooks();
  });
});

/* ── Inicialização ── */
renderBooks(ALL_BOOKS);
