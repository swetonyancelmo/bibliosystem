/* ============================================================
   DADOS FIXOS DOS LIVROS
   ============================================================ */
const BOOKS = [
  {
    id: 1,
    titulo: 'Clean Code',
    autor: 'Robert C. Martin',
    isbn: '978-0132350884',
    categoria: 'Programacao',
    disponivel: true,
    descricao: 'Um guia essencial sobre como escrever código limpo, legível e de fácil manutenção para programadores de todas as experiências.',
    coverUrl: '',
    linkEmprestar: 'emprestimo.html?id=1',
    linkReservar: 'reserva.html?id=1',
    linkDetalhes: 'livro.html?id=1',
  },
  {
    id: 2,
    titulo: 'O Senhor dos Anéis',
    autor: 'J.R.R. Tolkien',
    isbn: '978-8533613379',
    categoria: 'Ficcao',
    disponivel: true,
    descricao: 'A épica jornada de Frodo Bolseiro para destruir o Um Anel e salvar a Terra-média das trevas de Sauron.',
    coverUrl: '',
    linkEmprestar: 'emprestimo.html?id=2',
    linkReservar: 'reserva.html?id=2',
    linkDetalhes: 'livro.html?id=2',
  },
  {
    id: 3,
    titulo: 'Dom Casmurro',
    autor: 'Machado de Assis',
    isbn: '978-8535902778',
    categoria: 'Literatura',
    disponivel: false,
    descricao: 'Um clássico da literatura brasileira que narra a história de Bentinho e Capitu, repleta de ambiguidade e ciúmes.',
    coverUrl: '',
    linkEmprestar: 'emprestimo.html?id=3',
    linkReservar: 'reserva.html?id=3',
    linkDetalhes: 'livro.html?id=3',
  },
  {
    id: 4,
    titulo: 'Sapiens',
    autor: 'Yuval Noah Harari',
    isbn: '978-8535919691',
    categoria: 'Historia',
    disponivel: true,
    descricao: 'Uma breve história da humanidade que explora como o Homo sapiens veio a dominar a Terra em apenas alguns milênios.',
    coverUrl: '',
    linkEmprestar: 'emprestimo.html?id=4',
    linkReservar: 'reserva.html?id=4',
    linkDetalhes: 'livro.html?id=4',
  },
  {
    id: 5,
    titulo: 'Design Patterns',
    autor: 'Gang of Four',
    isbn: '978-0201633610',
    categoria: 'Programacao',
    disponivel: false,
    descricao: 'O livro definitivo sobre padrões de projeto de software reutilizáveis orientados a objetos.',
    coverUrl: '',
    linkEmprestar: 'emprestimo.html?id=5',
    linkReservar: 'reserva.html?id=5',
    linkDetalhes: 'livro.html?id=5',
  },
  {
    id: 6,
    titulo: 'O Alquimista',
    autor: 'Paulo Coelho',
    isbn: '978-8501014764',
    categoria: 'Ficcao',
    disponivel: true,
    descricao: 'A história de Santiago, um jovem pastor que parte em busca de um tesouro, numa viagem de autodescoberta.',
    coverUrl: '',
    linkEmprestar: 'emprestimo.html?id=6',
    linkReservar: 'reserva.html?id=6',
    linkDetalhes: 'livro.html?id=6',
  },
  {
    id: 7,
    titulo: 'Estruturas de Dados',
    autor: 'Thomas H. Cormen',
    isbn: '978-8535236996',
    categoria: 'Programacao',
    disponivel: true,
    descricao: 'A obra de referência em algoritmos e estruturas de dados usada em universidades de todo o mundo.',
    coverUrl: '',
    linkEmprestar: 'emprestimo.html?id=7',
    linkReservar: 'reserva.html?id=7',
    linkDetalhes: 'livro.html?id=7',
  },
  {
    id: 8,
    titulo: 'Cem Anos de Solidão',
    autor: 'Gabriel García Márquez',
    isbn: '978-8501012289',
    categoria: 'Literatura',
    disponivel: false,
    descricao: 'A saga da família Buendía ao longo de sete gerações na fictícia cidade de Macondo.',
    coverUrl: '',
    linkEmprestar: 'emprestimo.html?id=8',
    linkReservar: 'reserva.html?id=8',
    linkDetalhes: 'livro.html?id=8',
  },
  {
    id: 9,
    titulo: 'Breve História do Tempo',
    autor: 'Stephen Hawking',
    isbn: '978-8580410464',
    categoria: 'Ciencias',
    disponivel: true,
    descricao: 'Uma exploração acessível dos grandes temas da cosmologia moderna: buracos negros, o Big Bang e a natureza do tempo.',
    coverUrl: '',
    linkEmprestar: 'emprestimo.html?id=9',
    linkReservar: 'reserva.html?id=9',
    linkDetalhes: 'livro.html?id=9',
  },
  {
    id: 10,
    titulo: '1984',
    autor: 'George Orwell',
    isbn: '978-8535914849',
    categoria: 'Ficcao',
    disponivel: true,
    descricao: 'Uma distopia sombria onde o partido controla tudo, inclusive o pensamento, por meio do Grande Irmão.',
    coverUrl: '',
    linkEmprestar: 'emprestimo.html?id=10',
    linkReservar: 'reserva.html?id=10',
    linkDetalhes: 'livro.html?id=10',
  },
];

/* ============================================================
   CARREGA LIVROS DO LOCALSTORAGE E MESCLA COM OS FIXOS
   ============================================================ */
function carregarLivrosDoStorage() {
  const salvos = JSON.parse(localStorage.getItem('livros')) || [];

  // Converte o formato do formulário para o formato dos cards
  return salvos.map((livro, index) => ({
    id:           `local-${index}`,
    titulo:       livro.titulo    || 'Sem título',
    autor:        livro.autor     || 'Autor desconhecido',
    isbn:         livro.isbn      || '',
    categoria:    livro.categoria || '',
    disponivel:   livro.status !== 'reservado',
    descricao:    livro.descricao || '',
    coverUrl:     livro.imagem    || '',
    linkEmprestar: '#',
    linkReservar:  '#',
    linkDetalhes:  '#',
  }));
}

// Todos os livros = fixos + salvos pelo usuário
const ALL_BOOKS = [...BOOKS, ...carregarLivrosDoStorage()];
let currentBooks = [...ALL_BOOKS];
let selectedCategory = '';

/* ============================================================
   ELEMENTOS DO DOM
   ============================================================ */
const searchInput   = document.getElementById('searchInput');
const searchBtn     = document.getElementById('searchBtn');
const categoryBtn   = document.getElementById('categoryBtn');
const categoryLabel = document.getElementById('categoryLabel');
const categoryMenu  = document.getElementById('categoryMenu');
const booksGrid     = document.getElementById('booksGrid');
const booksCount    = document.getElementById('booksCount');
const booksEmpty    = document.getElementById('booksEmpty');

/* ============================================================
   RENDERIZAÇÃO
   ============================================================ */
function renderBooks(books) {
  booksGrid.innerHTML = '';

  if (books.length === 0) {
    booksEmpty.hidden = false;
    booksCount.textContent = '0 livros encontrados';
    return;
  }

  booksEmpty.hidden = true;
  booksCount.textContent = `${books.length} livro${books.length !== 1 ? 's' : ''} encontrado${books.length !== 1 ? 's' : ''}`;

  books.forEach(book => {
    booksGrid.appendChild(buildCard(book));
  });
}

function buildCard(book) {
  const card = document.createElement('article');
  card.className = 'book-card';
  card.dataset.id = book.id;

  const badgeClass = book.disponivel ? 'badge--disponivel' : 'badge--indisponivel';
  const badgeText  = book.disponivel ? 'Disponível' : 'Indisponível';
  const actionBtn  = book.disponivel
    ? `<a href="${book.linkEmprestar}" class="btn btn--primary">Emprestar</a>`
    : `<a href="${book.linkReservar}"  class="btn btn--outline">Reservar</a>`;

  card.innerHTML = `
    <a href="${book.linkDetalhes}" class="book-card__cover" aria-label="Ver detalhes de ${book.titulo}">
      ${book.coverUrl
        ? `<img src="${book.coverUrl}" alt="Capa de ${book.titulo}" loading="lazy" />`
        : `<span class="book-card__cover-placeholder">[ Capa ]</span>`}
    </a>
    <div class="book-card__body">
      <span class="badge ${badgeClass}">${badgeText}</span>
      <a href="${book.linkDetalhes}" class="book-card__title">${book.titulo}</a>
      <p class="book-card__author">${book.autor}</p>
      <span class="tag">${formatCategory(book.categoria)}</span>
    </div>
    <div class="book-card__footer">
      ${actionBtn}
    </div>
  `;

  return card;
}

function formatCategory(cat) {
  const map = {
    Programacao: 'Programação',
    Ficcao:      'Ficção',
    Literatura:  'Literatura',
    Historia:    'História',
    Ciencias:    'Ciências',
  };
  return map[cat] || cat;
}

/* ============================================================
   BUSCA E FILTRO
   ============================================================ */
function filterBooks() {
  const query = searchInput.value.trim().toLowerCase();

  currentBooks = ALL_BOOKS.filter(book => {
    const matchCategory = !selectedCategory || book.categoria === selectedCategory;
    const matchQuery    = !query
      || book.titulo.toLowerCase().includes(query)
      || book.autor.toLowerCase().includes(query)
      || (book.isbn && book.isbn.includes(query));
    return matchCategory && matchQuery;
  });

  renderBooks(currentBooks);
}

searchBtn.addEventListener('click', filterBooks);
searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') filterBooks(); });

/* ============================================================
   DROPDOWN DE CATEGORIA
   ============================================================ */
categoryBtn.addEventListener('click', e => {
  e.stopPropagation();
  const isOpen = categoryMenu.classList.toggle('is-open');
  categoryBtn.setAttribute('aria-expanded', isOpen);
});

document.addEventListener('click', () => {
  categoryMenu.classList.remove('is-open');
  categoryBtn.setAttribute('aria-expanded', false);
});

categoryMenu.querySelectorAll('.dropdown__item').forEach(item => {
  item.addEventListener('click', () => {
    selectedCategory = item.dataset.value;
    categoryLabel.textContent = item.textContent;

    categoryMenu.querySelectorAll('.dropdown__item').forEach(i => i.classList.remove('is-selected'));
    item.classList.add('is-selected');

    categoryMenu.classList.remove('is-open');
    categoryBtn.setAttribute('aria-expanded', false);
    filterBooks();
  });
});

/* ============================================================
   INICIALIZAÇÃO
   ============================================================ */
renderBooks(ALL_BOOKS);