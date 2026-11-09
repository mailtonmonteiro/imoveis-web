// clientes.js
// Sprint 3: cadastra e lista clientes consumindo a API REST do back-end.

const API_URL = '/api/clientes';

const form = document.getElementById('form-cliente');
const mensagemEl = document.getElementById('mensagem');
const corpoTabela = document.getElementById('corpo-tabela-clientes');
const semClientesEl = document.getElementById('sem-clientes');

function mostrarMensagem(texto, tipo) {
  mensagemEl.textContent = texto;
  mensagemEl.className = `mensagem ${tipo}`;
}

// Evita que texto digitado vire HTML na tabela
function escapar(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

async function carregarClientes() {
  try {
    const resposta = await fetch(API_URL);
    if (!resposta.ok) throw new Error('Falha ao buscar clientes.');
    const clientes = await resposta.json();
    renderizarTabela(clientes);
  } catch (erro) {
    console.error(erro);
    semClientesEl.textContent = 'Erro ao carregar clientes. Verifique se o servidor está rodando.';
    semClientesEl.style.display = 'block';
  }
}

function renderizarTabela(clientes) {
  corpoTabela.innerHTML = '';

  if (clientes.length === 0) {
    semClientesEl.textContent = 'Nenhum cliente cadastrado ainda.';
    semClientesEl.style.display = 'block';
    return;
  }
  semClientesEl.style.display = 'none';

  for (const c of clientes) {
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${c.id}</td>
      <td>${escapar(c.nome)}</td>
      <td>${escapar(c.cpf ?? '-')}</td>
      <td>${escapar(c.telefone ?? '-')}</td>
      <td>${escapar(c.email ?? '-')}</td>
      <td>${escapar(c.interesse ?? '-')}</td>
    `;
    corpoTabela.appendChild(linha);
  }
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
      throw new Error(resultado.erro || 'Erro ao cadastrar cliente.');
    }

    mostrarMensagem('Cliente cadastrado com sucesso!', 'sucesso');
    form.reset();
    carregarClientes();
  } catch (erro) {
    console.error(erro);
    mostrarMensagem(erro.message, 'erro');
  }
});

carregarClientes();
