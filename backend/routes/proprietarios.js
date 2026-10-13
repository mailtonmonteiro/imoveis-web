// routes/proprietarios.js
// Sprint 2: cadastrar e listar proprietários.

const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET /api/proprietarios - lista todos os proprietários cadastrados
router.get('/', (req, res) => {
  try {
    const proprietarios = db
      .prepare('SELECT * FROM proprietarios ORDER BY data_cadastro DESC, id DESC')
      .all();
    res.json(proprietarios);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar proprietários.', detalhe: err.message });
  }
});

// POST /api/proprietarios - cadastra um novo proprietário
router.post('/', (req, res) => {
  const { nome, cpf, telefone, email, endereco } = req.body;

  if (!nome || !nome.trim()) {
    return res.status(400).json({ erro: 'Campo obrigatório: nome.' });
  }

  try {
    const info = db
      .prepare(
        `INSERT INTO proprietarios (nome, cpf, telefone, email, endereco)
         VALUES (?, ?, ?, ?, ?)`
      )
      .run(
        nome.trim(),
        cpf || null,
        telefone || null,
        email || null,
        endereco || null
      );

    const novo = db
      .prepare('SELECT * FROM proprietarios WHERE id = ?')
      .get(info.lastInsertRowid);

    res.status(201).json(novo);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao cadastrar proprietário.', detalhe: err.message });
  }
});

module.exports = router;
