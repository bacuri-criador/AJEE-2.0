
const express = require('express');
const cors = require('cors');

const app = express();

const inscricaoRoutes = require('./route/inscricao.routes');

app.use(cors());
app.use(express.json());

// Rota inicial
app.get('/', (req, res) => {
    return res.status(200).json({
        mensagem: 'API AJEE 2.0 funcionando!',
        versao: '1.0.0'
    });
});

// Rotas de inscrições
app.use('/inscricoes', inscricaoRoutes);

module.exports = app;
