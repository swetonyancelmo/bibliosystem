let emprestimos = [
{
    id:1,
    titulo:"Design Patterns",
    autor:"Gang of Four",
    capa:"https://m.media-amazon.com/images/I/81gtKoapHFL.jpg",
    emprestimo:"10/05/2026",
    devolucao:"10/06/2026",
    status:"Em dia"
},
{
    id:2,
    titulo:"Código Limpo",
    autor:"Robert C. Martin",
    capa:"https://m.media-amazon.com/images/I/41SH-SvWPxL.jpg",
    emprestimo:"01/05/2026",
    devolucao:"20/05/2026",
    status:"Atrasado"
},
{
    id:3,
    titulo:"O Hobbit",
    autor:"J.R.R. Tolkien",
    capa:"https://m.media-amazon.com/images/I/91M9xPIf10L.jpg",
    emprestimo:"15/05/2026",
    devolucao:"15/06/2026",
    status:"Em dia"
}
];

const lista = document.getElementById("listaEmprestimos");
const vazio = document.getElementById("estadoVazio");

function renderizar(){

    lista.innerHTML = "";

    if(emprestimos.length === 0){
        vazio.hidden = false;
        return;
    }

    vazio.hidden = true;

    emprestimos.forEach(livro => {

        const card = document.createElement("div");
        card.className = "card-emprestimo";

        card.innerHTML = `
            <div class="livro-info">

                <img src="${livro.capa}" class="capa" alt="${livro.titulo}">

                <div class="livro-dados">
                    <h3>${livro.titulo}</h3>
                    <p>${livro.autor}</p>
                    <p>Empréstimo: ${livro.emprestimo}</p>
                    <p>Devolução: ${livro.devolucao}</p>

                    <span class="badge ${
                        livro.status === "Atrasado"
                        ? "badge-atrasado"
                        : "badge-em-dia"
                    }">
                        ${livro.status}
                    </span>
                </div>

            </div>

            <div class="acoes">
                <button class="btn-renovar">
                    Renovar
                </button>

                <button class="btn-devolver">
                    Devolver
                </button>
            </div>
        `;

        card.querySelector(".btn-renovar")
        .addEventListener("click", () => {

            Swal.fire({
                icon:"success",
                title:"Empréstimo renovado!",
                text: `${livro.titulo} foi renovado por mais 15 dias.`
            });

        });

        card.querySelector(".btn-devolver")
        .addEventListener("click", () => {

            Swal.fire({
                title:"Devolver livro?",
                text: `Deseja devolver "${livro.titulo}"?`,
                icon:"question",
                showCancelButton:true,
                confirmButtonText:"Sim",
                cancelButtonText:"Cancelar"
            }).then(result => {

                if(result.isConfirmed){

                    emprestimos =
                    emprestimos.filter(
                        item => item.id !== livro.id
                    );

                    renderizar();

                    Swal.fire(
                        "Devolvido!",
                        "Livro devolvido com sucesso.",
                        "success"
                    );
                }
            });

        });

        lista.appendChild(card);

    });

}

document.getElementById("btnRenovarTodos")
.addEventListener("click", () => {

    Swal.fire({
        icon:"success",
        title:"Renovação concluída!",
        text:"Todos os empréstimos elegíveis foram renovados."
    });

});

renderizar();