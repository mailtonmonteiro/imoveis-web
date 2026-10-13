// proprietarios.js
// Sprint 2: cadastra e lista proprietários consumindo a API REST do back-end.

const API_URL = '/api/proprietarios';

const form = document.getElementById('form-proprietario');
const mensagemEl = document.getElementById('mensagem');
const corpoTabela = document.getElementById('corpo-tabela-proprietarios');
const semProprietariosEl = document.getElementById('sem-proprietarios');

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

async function carregarProprietarios() {
  try {
    const resposta = await fetch(API_URL);
    if (!resposta.ok) throw new Error('Falha ao buscar proprietários.');
    const proprietarios = await resposta.json();
    renderizarTabela(proprietarios);
  } catch (erro) {
    console.error(erro);
    semProprietariosEl.textContent = 'Erro ao carregar proprietários. Verifique se o servidor está rodando.';
    semProprietariosEl.style.display = 'block';
  }
}

function renderizarTabela(proprietarios) {
  corpoTabela.innerHTML = '';

  if (proprietarios.length === 0) {
    semProprietariosEl.textContent = 'Nenhum proprietário cadastrado ainda.';
    semProprietariosEl.style.display = 'block';
    return;
  }
  semProprietariosEl.style.display = 'none';

  for (const p of proprietarios) {
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${p.id}</td>
      <td>${escapar(p.nome)}</td>
      <td>${escapar(p.cpf ?? '-')}</td>
      <td>${escapar(p.telefone ?? '-')}</td>
      <td>${escapar(p.email ?? '-')}</td>
      <td>${escapar(p.endereco ?? '-')}</td>
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
      throw new Error(resultado.erro || 'Erro ao cadastrar proprietário.');
    }

    mostrarMensagem('Proprietário cadastrado com sucesso!', 'sucesso');
    form.reset();
    carregarProprietarios();
  } catch (erro) {
    console.error(erro);
    mostrarMensagem(erro.message, 'erro');
  }
});

carregarProprietarios();
