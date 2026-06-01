/* ============================================================
   DADOS DOS LIVROS FIXOS DO ACERVO
   Usado por: main.js (catálogo) e livro.js (detalhe)
   ============================================================ */
var LIVROS_FIXOS = [
  {
    id: 1,
    titulo: 'Clean Code',
    autor: 'Robert C. Martin',
    isbn: '978-0132350884',
    categoria: 'Programacao',
    ano: '2008',
    disponivel: true,
    descricao: 'Um guia essencial sobre como escrever código limpo, legível e de fácil manutenção para programadores de todas as experiências.',
    coverUrl: 'https://m.media-amazon.com/images/I/41MigGXVuiL._SY445_SX342_ML2_.jpg',
  },
  {
    id: 2,
    titulo: 'O Senhor dos Anéis',
    autor: 'J.R.R. Tolkien',
    isbn: '978-8533613379',
    categoria: 'Ficcao',
    ano: '2001',
    disponivel: true,
    descricao: 'A épica jornada de Frodo Bolseiro para destruir o Um Anel e salvar a Terra-média das trevas de Sauron.',
    coverUrl: 'https://m.media-amazon.com/images/I/81hCVEC0ExL._SY522_.jpg',
  },
  {
    id: 3,
    titulo: 'Dom Casmurro',
    autor: 'Machado de Assis',
    isbn: '978-8535902778',
    categoria: 'Literatura',
    ano: '1899',
    disponivel: false,
    descricao: 'Um clássico da literatura brasileira que narra a história de Bentinho e Capitu, repleta de ambiguidade e ciúmes.',
    coverUrl: 'https://m.media-amazon.com/images/I/61x1ZHomWUL._SY522_.jpg',
  },
  {
    id: 4,
    titulo: 'Sapiens',
    autor: 'Yuval Noah Harari',
    isbn: '978-8535919691',
    categoria: 'Historia',
    ano: '2011',
    disponivel: true,
    descricao: 'Uma breve história da humanidade que explora como o Homo sapiens veio a dominar a Terra em apenas alguns milênios.',
    coverUrl: 'https://m.media-amazon.com/images/I/71-ghLb8qML._SY522_.jpg',
  },
  {
    id: 5,
    titulo: 'Design Patterns',
    autor: 'Gang of Four',
    isbn: '978-0201633610',
    categoria: 'Programacao',
    ano: '1994',
    disponivel: false,
    descricao: 'O livro definitivo sobre padrões de projeto de software reutilizáveis orientados a objetos.',
    coverUrl: 'https://m.media-amazon.com/images/I/81IGFC6oFmL._SY466_.jpg',
  },
  {
    id: 6,
    titulo: 'O Alquimista',
    autor: 'Paulo Coelho',
    isbn: '978-8501014764',
    categoria: 'Ficcao',
    ano: '1988',
    disponivel: true,
    descricao: 'A história de Santiago, um jovem pastor que parte em busca de um tesouro, numa viagem de autodescoberta.',
    coverUrl: 'https://m.media-amazon.com/images/I/81slUinjTlS._SY522_.jpg',
  },
  {
    id: 7,
    titulo: 'Estruturas de Dados',
    autor: 'Thomas H. Cormen',
    isbn: '978-8535236996',
    categoria: 'Programacao',
    ano: '2009',
    disponivel: true,
    descricao: 'A obra de referência em algoritmos e estruturas de dados usada em universidades de todo o mundo.',
    coverUrl: 'https://m.media-amazon.com/images/I/81MNGKuzJcL._SY466_.jpg',
  },
  {
    id: 8,
    titulo: 'Cem Anos de Solidão',
    autor: 'Gabriel García Márquez',
    isbn: '978-8501012289',
    categoria: 'Literatura',
    ano: '1967',
    disponivel: false,
    descricao: 'A saga da família Buendía ao longo de sete gerações na fictícia cidade de Macondo.',
    coverUrl: 'https://m.media-amazon.com/images/I/515cVYLIP9L._SY445_SX342_ML2_.jpg',
  },
  {
    id: 9,
    titulo: 'Breve História do Tempo',
    autor: 'Stephen Hawking',
    isbn: '978-8580410464',
    categoria: 'Ciencias',
    ano: '1988',
    disponivel: true,
    descricao: 'Uma exploração acessível dos grandes temas da cosmologia moderna: buracos negros, o Big Bang e a natureza do tempo.',
    coverUrl: 'https://m.media-amazon.com/images/I/51FBILW8cWS._SY445_SX342_ML2_.jpg',
  },
  {
    id: 10,
    titulo: '1984',
    autor: 'George Orwell',
    isbn: '978-8535914849',
    categoria: 'Ficcao',
    ano: '1949',
    disponivel: true,
    descricao: 'Uma distopia sombria onde o partido controla tudo, inclusive o pensamento, por meio do Grande Irmão.',
    coverUrl: 'https://m.media-amazon.com/images/I/51VXYaKO-sL._SY445_SX342_ML2_.jpg',
  },
];

/* Retorna true/false para disponibilidade, verificando o localStorage para atualizações dinâmicas */
function getLivroDisponivel(id, defaultDisponivel) {
  var status = JSON.parse(localStorage.getItem('livrosStatus')) || {};
  return (id in status) ? status[id] : defaultDisponivel;
}

/* Formata a categoria para exibição */
function formatarCategoria(cat) {
  var map = {
    Programacao: 'Programação',
    Ficcao:      'Ficção',
    Literatura:  'Literatura',
    Historia:    'História',
    Ciencias:    'Ciências',
  };
  return map[cat] || cat;
}
