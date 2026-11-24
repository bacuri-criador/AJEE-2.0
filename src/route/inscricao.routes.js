
const express = require('express');

const router = express.Router();

const inscricaoController = require('../controller/inscricao.controller');

// Criar inscrição
router.post('/', (req, res) =>
    inscricaoController.criar(req, res)
);

// Listar inscrições
router.get('/', (req, res) =>
    inscricaoController.listar(req, res)
);

// Buscar inscrição por ID
router.get('/:id', (req, res) =>
    inscricaoController.buscarPorId(req, res)
);

// Atualizar inscrição
router.put('/:id', (req, res) =>
    inscricaoController.atualizar(req, res)
);

// Cancelar inscrição
router.delete('/:id', (req, res) =>
    inscricaoController.cancelar(req, res)
);

module.exports = router;
