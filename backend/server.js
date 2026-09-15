// server.js
// Ponto de entrada do back-end: configura o Express, a API e serve o front-end.

const express = require('express');
const cors = require('cors');
const path = require('path');

const imoveisRoutes = require('./routes/imoveis');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api/imoveis', imoveisRoutes);

// Serve o front-end (HTML/CSS/JS) como arquivos estáticos
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
