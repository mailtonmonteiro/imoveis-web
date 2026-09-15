// routes/imoveis.js
// Sprint 1: cadastrar e listar imóveis.

const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET /api/imoveis - lista todos os imóveis cadastrados
router.get('/', (req, res) => {
  try {
    const imoveis = db
      .prepare('SELECT * FROM imoveis ORDER BY data_cadastro DESC')
      .all();
    res.json(imoveis);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar imóveis.', detalhe: err.message });
  }
});

// POST /api/imoveis - cadastra um novo imóvel
const MODALIDADES_VALIDAS = ['venda', 'aluguel'];
const STATUS_VALIDOS = ['disponível', 'indisponível'];

router.post('/', (req, res) => {
  const {
    tipo,
    modalidade,
    endereco,
    bairro,
    cidade,
    area,
    quartos,
    banheiros,
    valor,
    descricao,
    status
  } = req.body;

  if (!tipo || !modalidade || !endereco || !cidade || valor === undefined || valor === null || valor === '') {
    return res
      .status(400)
      .json({ erro: 'Campos obrigatórios: tipo, modalidade, endereco, cidade e valor.' });
  }

  if (!MODALIDADES_VALIDAS.includes(modalidade)) {
    return res
      .status(400)
      .json({ erro: `Modalidade inválida. Use: ${MODALIDADES_VALIDAS.join(', ')}.` });
  }

  if (status && !STATUS_VALIDOS.includes(status)) {
    return res
      .status(400)
      .json({ erro: `Status inválido. Use: ${STATUS_VALIDOS.join(', ')}.` });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO imoveis (tipo, modalidade, endereco, bairro, cidade, area, quartos, banheiros, valor, descricao, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(
      tipo,
      modalidade,
      endereco,
      bairro || null,
      cidade,
      area || null,
      quartos || null,
      banheiros || null,
      valor,
      descricao || null,
      status || 'disponível'
    );

    const novoImovel = db
      .prepare('SELECT * FROM imoveis WHERE id = ?')
      .get(info.lastInsertRowid);

    res.status(201).json(novoImovel);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao cadastrar imóvel.', detalhe: err.message });
  }
});

module.exports = router;
