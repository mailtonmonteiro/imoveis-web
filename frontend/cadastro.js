// cadastro.js
// Envia o formulário de cadastro de imóvel para a API.

const API_URL = '/api/imoveis';

const form = document.getElementById('form-imovel');
const mensagemEl = document.getElementById('mensagem');

function mostrarMensagem(texto, tipo) {
  mensagemEl.textContent = texto;
  mensagemEl.className = `mensagem ${tipo}`;
}

form.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const dados = Object.fromEntries(new FormData(form).entries());

  try {
    const resposta = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      throw new Error(resultado.erro || 'Erro ao cadastrar imóvel.');
    }

    mostrarMensagem('Imóvel cadastrado com sucesso! Veja na página Home.', 'sucesso');
    form.reset();
  } catch (erro) {
    console.error(erro);
    mostrarMensagem(erro.message, 'erro');
  }
});
