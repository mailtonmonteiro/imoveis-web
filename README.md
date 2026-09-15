# Sistema de Gerenciamento de Imóveis

Projeto imobiliária TOP

## Tecnologias

- **Front-end:** HTML, CSS, JavaScript (vanilla)
- **Back-end:** Node.js + Express
- **Banco de dados:** SQLite (arquivo local, via `better-sqlite3`)

## Estrutura do projeto

```
imoveis-app/
├── backend/
│   ├── db/
│   │   └── database.js      # conexão e criação das tabelas do SQLite
│   ├── routes/
│   │   └── imoveis.js       # rotas da API de imóveis
│   ├── package.json
│   └── server.js            # servidor Express
└── frontend/
    ├── index.html     # Home — listagem de imóveis
    ├── cadastro.html  # Cadastro de imóveis
    ├── sobre.html     # Sobre (informações fictícias)
    ├── home.js
    ├── cadastro.js
    └── style.css
```

## Como rodar (Sprint 1)

1. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado (versão 18+; testado com Node v24).
2. Entre na pasta do back-end:
   ```bash
   cd backend
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```
5. Abra o navegador em: **http://localhost:3000**

O banco de dados SQLite (`imoveis.db`) é criado automaticamente dentro de `backend/db/` na primeira execução.