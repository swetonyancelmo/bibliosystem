// js/perfil.js

// Seleciona o botão "Salvar alterações"
const btnSalvar = document.getElementById("btnSalvar");

// Adiciona evento de clique
btnSalvar.addEventListener("click", () => {
    // Pega os valores dos inputs
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    // Validação simples
    if (!nome || !email) {
        alert("Preencha o nome e o e-mail.");
        return;
    }

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
    }

    // Aqui você poderia salvar os dados no servidor via fetch/AJAX
    // Por enquanto, apenas alerta
    alert("Alterações salvas com sucesso!\nNome: " + nome + "\nEmail: " + email);

    // Opcional: limpar campos de senha
    document.getElementById("senha").value = "";
    document.getElementById("confirmarSenha").value = "";
});