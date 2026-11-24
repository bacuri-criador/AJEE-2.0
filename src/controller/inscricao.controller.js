
const inscricaoService = require('../service/inscricao.service');

class InscricaoController {

    // POST - Criar
    async criar(req, res) {
        try {
            const inscricao = await inscricaoService.criar(req.body);

            return res.status(201).json({
                mensagem: 'InscriÃ§Ã£o realizada com sucesso!',
                dados: inscricao
            });

        } catch (error) {
            return res.status(400).json({
                mensagem: error.message
            });
        }
    }

    // GET - Listar
    async listar(req, res) {
        try {
            const inscricoes = await inscricaoService.listar(req.query);

            return res.status(200).json(inscricoes);

        } catch (error) {
            return res.status(500).json({
                mensagem: 'Erro ao listar inscriÃ§Ãµes.',
                erro: error.message
            });
        }
    }

    // GET - Buscar por ID
    async buscarPorId(req, res) {
        try {
            const inscricao = await inscricaoService.buscarPorId(req.params.id);

            return res.status(200).json(inscricao);

        } catch (error) {
            const status = error.message === 'InscriÃ§Ã£o nÃ£o encontrada.' ? 404 : 400;

            return res.status(status).json({
                mensagem: error.message
            });
        }
    }

    // PUT - Atualizar
    async atualizar(req, res) {
        try {
            const inscricao = await inscricaoService.atualizar(
                req.params.id,
                req.body
            );

            return res.status(200).json({
                mensagem: 'InscriÃ§Ã£o atualizada com sucesso!',
                dados: inscricao
            });

        } catch (error) {
            const status = error.message === 'InscriÃ§Ã£o nÃ£o encontrada.' ? 404 : 400;

            return res.status(status).json({
                mensagem: error.message
            });
        }
    }

    // DELETE - Cancelar
    async cancelar(req, res) {
        try {
            const inscricao = await inscricaoService.cancelar(req.params.id);

            return res.status(200).json({
                mensagem: 'InscriÃ§Ã£o cancelada com sucesso!',
                dados: inscricao
            });

        } catch (error) {
            const status = error.message === 'InscriÃ§Ã£o nÃ£o encontrada.' ? 404 : 400;

            return res.status(status).json({
                mensagem: error.message
            });
        }
    }
}

module.exports = new InscricaoController();

