// db/database.js
// Responsável por abrir a conexão com o SQLite e garantir que as tabelas existam.
// O esquema completo (imóveis, proprietários, clientes) é criado desde já,
// mas as rotas/API de cada tabela vão sendo implementadas sprint a sprint.

const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'imoveis.db');
const db = new Database(dbPath);

db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS proprietarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cpf TEXT,
    telefone TEXT,
    email TEXT,
    endereco TEXT,
    data_cadastro TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cpf TEXT,
    telefone TEXT,
    email TEXT,
    interesse TEXT,
    data_cadastro TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS imoveis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo TEXT NOT NULL,
    modalidade TEXT NOT NULL CHECK (modalidade IN ('venda', 'aluguel')),
    endereco TEXT NOT NULL,
    bairro TEXT,
    cidade TEXT NOT NULL,
    area REAL,
    quartos INTEGER,
    banheiros INTEGER,
    valor REAL NOT NULL,
    descricao TEXT,
    status TEXT NOT NULL DEFAULT 'disponível' CHECK (status IN ('disponível', 'indisponível')),
    proprietario_id INTEGER,
    data_cadastro TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (proprietario_id) REFERENCES proprietarios(id)
  );
`);

// Migração simples: se o banco já existia (criado antes da coluna "modalidade"
// e dos novos valores de status), adiciona a coluna que estiver faltando.
const colunasImoveis = db.prepare('PRAGMA table_info(imoveis)').all().map((c) => c.name);
if (!colunasImoveis.includes('modalidade')) {
  db.exec("ALTER TABLE imoveis ADD COLUMN modalidade TEXT NOT NULL DEFAULT 'venda'");
}

module.exports = db;
