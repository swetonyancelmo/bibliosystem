const reservas = [
  {
    livro: "Design Patterns",
    autor: "Gang of Four",
    data: "20/04/2026",
    status: "disponivel"
  },
  {
    livro: "O Hobbit",
    autor: "J.R.R. Tolkien",
    data: "05/05/2026",
    status: "fila"
  },
  {
    livro: "Código Limpo",
    autor: "Robert C. Martin",
    data: "12/05/2026",
    status: "fila"
  }
];

const lista = document.querySelector(".reservas-list");

function renderReservas() {

  lista.innerHTML = "";

  reservas.forEach((reserva, index) => {

    const statusTexto =
      reserva.status === "disponivel"
        ? "Disponível"
        : "Na fila";

    const item = document.createElement("div");

    item.className = "reserva-item";

    item.innerHTML = `
      <div class="reserva-livro">

        <div class="capa-placeholder"></div>

        <div class="livro-info">
          <h3>${reserva.livro}</h3>
          <p>${reserva.autor}</p>
          <span>Reservado em: ${reserva.data}</span>
        </div>

      </div>

      <div class="status ${reserva.status}">
        ${statusTexto}
      </div>

      <button class="btn-outline" onclick="cancelarReserva(${index})">
        Cancelar reserva
      </button>
    `;

    lista.appendChild(item);

  });
}

function cancelarReserva(index) {

  if (confirm("Deseja cancelar esta reserva?")) {

    reservas.splice(index, 1);

    renderReservas();

  }
}

renderReservas();