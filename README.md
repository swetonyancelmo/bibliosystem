# BiblioSystem — Sistema de Biblioteca

Trabalho acadêmico de frontend simulando um sistema de gerenciamento de biblioteca. Desenvolvido com HTML, CSS e JavaScript puro, sem frameworks ou dependências de build.

## Tecnologias

- HTML5 semântico
- CSS3 (arquivos por página)
- JavaScript Vanilla (ES5/ES6+)
- [SweetAlert2](https://sweetalert2.github.io/) — modais de confirmação e toasts de feedback

## Estrutura de arquivos

```
sistema-biblioteca/
├── index.html          # Catálogo de livros (página inicial)
├── livro.html          # Detalhe do livro + solicitação de empréstimo
├── livros.html         # Gerenciamento do acervo (somente bibliotecário)
├── admin.html          # Painel de empréstimos (somente bibliotecário)
├── emprestimos.html    # Meus empréstimos (usuário)
├── perfil.html         # Perfil do usuário
├── login.html          # Login
├── cadastro.html       # Cadastro de novo usuário
│
├── css/
│   ├── style.css       # Catálogo e estilos globais
│   ├── livro.css
│   ├── livros.css
│   ├── admin.css
│   ├── emprestimos.css
│   ├── perfil.css
│   ├── login.css
│   └── cadastro.css
│
└── js/
    ├── livros-data.js  # Dados fixos do acervo (compartilhado)
    ├── navbar.js       # Lógica da navbar (avatar + links por perfil)
    ├── main.js         # Catálogo: renderização e busca
    ├── livro.js        # Detalhe do livro + solicitação
    ├── livros.js       # CRUD do acervo (bibliotecário)
    ├── admin.js        # Aprovação/rejeição/devolução
    ├── emprestimos.js  # Histórico de empréstimos do usuário
    ├── perfil.js       # Edição de perfil
    ├── login.js        # Autenticação
    └── cadastro.js     # Registro de conta
```

## Funcionalidades

### Usuário comum
- Navegar pelo catálogo de livros com busca por título, autor ou ISBN
- Filtrar livros por categoria (Programação, Ficção, Literatura, História, Ciências)
- Ver detalhes de um livro (capa, descrição, ISBN, ano, disponibilidade)
- Solicitar empréstimo de livros disponíveis
- Acompanhar empréstimos pendentes, ativos e histórico

### Bibliotecário
- Todas as funcionalidades acima
- Cadastrar novos livros no acervo
- Aprovar ou rejeitar solicitações de empréstimo
- Registrar devolução de livros

## Como executar

Não há etapa de build. Abra o arquivo `index.html` diretamente no navegador.

> Para evitar restrições de CORS ao carregar imagens externas, recomenda-se usar uma extensão de servidor local como [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) no VS Code.

## Credenciais de acesso

| Perfil        | E-mail                  | Senha      |
|---------------|-------------------------|------------|
| Usuário       | `usuario@email.com`     | `123456`   |
| Bibliotecário | `admin@biblioteca.com`  | `admin123` |

Novos usuários também podem ser criados pela tela de cadastro (sempre com perfil de usuário comum).

## Persistência de dados

Todos os dados são armazenados no `localStorage` do navegador — não há backend. Isso inclui:

- Sessão do usuário logado (`usuarioLogado`)
- Usuários cadastrados (`usuarios`)
- Solicitações e empréstimos (`emprestimos`)
- Status de disponibilidade dos livros (`livrosStatus`)
- Livros adicionados pelo bibliotecário (`livros`)

## Links do projeto

- **Figma (Layout):** https://www.figma.com/design/EO6O1SE3LlkycqW3WhSof5/Sistema-de-Biblioteca-%E2%80%94-Layout-Frontend?node-id=0-1&p=f&t=w4BQZ41u4LLtD2Qs-0
- **Trello (Tarefas):** https://trello.com/invite/b/66017b7e9e05235575688e60/ATTIa99225424c230c86b72414aecdaae692D2C0FB07/sistema-de-biblioteca
