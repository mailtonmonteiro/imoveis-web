// home.js
// Busca os imóveis cadastrados na API e renderiza a tabela da página Home.

const API_URL = '/api/imoveis';

const corpoTabela = document.getElementById('corpo-tabela-imoveis');
const semImoveisEl = document.getElementById('sem-imoveis');

function formatarMoeda(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function formatarModalidade(modalidade) {
  return modalidade === 'aluguel' ? 'Aluguel' : 'Venda';
}

async function carregarImoveis() {
  try {
    const resposta = await fetch(API_URL);
    if (!resposta.ok) throw new Error('Falha ao buscar imóveis.');
    const imoveis = await resposta.json();
    renderizarTabela(imoveis);
  } catch (erro) {
    console.error(erro);
    semImoveisEl.textContent = 'Erro ao carregar imóveis. Verifique se o servidor está rodando.';
    semImoveisEl.style.display = 'block';
  }
}

function renderizarTabela(imoveis) {
  corpoTabela.innerHTML = '';

  if (imoveis.length === 0) {
    semImoveisEl.textContent = 'Nenhum imóvel cadastrado ainda.';
    semImoveisEl.style.display = 'block';
    return;
  }
  semImoveisEl.style.display = 'none';

  for (const imovel of imoveis) {
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${imovel.id}</td>
      <td>${imovel.tipo}</td>
      <td>${formatarModalidade(imovel.modalidade)}</td>
      <td>${imovel.endereco}</td>
      <td>${imovel.bairro ?? '-'}</td>
      <td>${imovel.cidade}</td>
      <td>${imovel.area ?? '-'}</td>
      <td>${imovel.quartos ?? '-'}</td>
      <td>${imovel.banheiros ?? '-'}</td>
      <td>${formatarMoeda(imovel.valor)}</td>
      <td><span class="badge badge-${imovel.status === 'disponível' ? 'ok' : 'indisponivel'}">${imovel.status}</span></td>
    `;
    corpoTabela.appendChild(linha);
  }
}

carregarImoveis();
