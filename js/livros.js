document
.getElementById("formLivro")
.addEventListener("submit", function(event){

    event.preventDefault();

    const titulo =
        document.getElementById("titulo").value;

    const autor =
        document.getElementById("autor").value;

    const categoria =
        document.getElementById("categoria").value;

    const imagem =
        document.getElementById("imagem").value;

    const novoLivro = {
        titulo,
        autor,
        categoria,
        imagem
    };

    let livros =
        JSON.parse(
            localStorage.getItem("livros")
        ) || [];

    livros.push(novoLivro);

    localStorage.setItem(
        "livros",
        JSON.stringify(livros)
    );

    alert("Livro cadastrado com sucesso!");

    window.location.href = "index.html";
});