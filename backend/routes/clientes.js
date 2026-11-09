// routes/clientes.js
// Sprint 3: cadastrar e listar clientes.

const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET /api/clientes - lista todos os clientes cadastrados
router.get('/', (req, res) => {
  try {
    const clientes = db
      .prepare('SELECT * FROM clientes ORDER BY data_cadastro DESC, id DESC')
      .all();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar clientes.', detalhe: err.message });
  }
});

// POST /api/clientes - cadastra um novo cliente
router.post('/', (req, res) => {
  const { nome, cpf, telefone, email, interesse } = req.body;

  if (!nome || !nome.trim()) {
    return res.status(400).json({ erro: 'Campo obrigatório: nome.' });
  }

  try {
    const info = db
      .prepare(
        `INSERT INTO clientes (nome, cpf, telefone, email, interesse)
         VALUES (?, ?, ?, ?, ?)`
      )
      .run(
        nome.trim(),
        cpf || null,
        telefone || null,
        email || null,
        interesse || null
      );

    const novo = db
      .prepare('SELECT * FROM clientes WHERE id = ?')
      .get(info.lastInsertRowid);

    res.status(201).json(novo);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao cadastrar cliente.', detalhe: err.message });
  }
});

module.exports = router;
