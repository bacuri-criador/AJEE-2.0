
const prisma = require('../config/prisma');

class InscricaoService {

    // CREATE - Criar inscrição
    async criar(dados) {
        const { associadoId, eventoId } = dados;

        if (!associadoId || !eventoId) {
            throw new Error('Associado e evento são obrigatórios.');
        }

        const associado = await prisma.associado.findUnique({
            where: { id: Number(associadoId) }
        });

        if (!associado || associado.status !== 'ATIVO') {
            throw new Error('Associado não encontrado ou inativo.');
        }

        const evento = await prisma.evento.findUnique({
            where: { id: Number(eventoId) }
        });

        if (!evento || !evento.ativo) {
            throw new Error('Evento não encontrado ou inativo.');
        }

        const existente = await prisma.inscricao.findUnique({
            where: {
                associadoId_eventoId: {
                    associadoId: Number(associadoId),
                    eventoId: Number(eventoId)
                }
            }
        });

        if (existente) {
            throw new Error('Este associado já está inscrito neste evento.');
        }

        return await prisma.inscricao.create({
            data: {
                associadoId: Number(associadoId),
                eventoId: Number(eventoId),
                status: 'PENDENTE'
            },
            include: {
                associado: {
                    include: { pessoa: true }
                },
                evento: true
            }
        });
    }

    // READ - Listar inscrições
    async listar(filtros = {}) {
        const where = {};

        if (filtros.associadoId) {
            where.associadoId = Number(filtros.associadoId);
        }

        if (filtros.eventoId) {
            where.eventoId = Number(filtros.eventoId);
        }

        if (filtros.status) {
            where.status = filtros.status;
        }

        return await prisma.inscricao.findMany({
            where,
            include: {
                associado: {
                    include: { pessoa: true }
                },
                evento: true,
                pagamento: true,
                certificado: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    // READ - Buscar inscrição por ID
    async buscarPorId(id) {
        const inscricao = await prisma.inscricao.findUnique({
            where: { id: Number(id) },
            include: {
                associado: {
                    include: { pessoa: true }
                },
                evento: true,
                pagamento: true,
                certificado: true
            }
        });

        if (!inscricao) {
            throw new Error('Inscrição não encontrada.');
        }

        return inscricao;
    }

    // UPDATE - Atualizar status
    async atualizar(id, dados) {
        const inscricao = await prisma.inscricao.findUnique({
            where: { id: Number(id) }
        });

        if (!inscricao) {
            throw new Error('Inscrição não encontrada.');
        }

        const statusPermitidos = [
            'PENDENTE',
            'CONFIRMADA'
        ];

        if (!statusPermitidos.includes(dados.status)) {
            throw new Error('Status informado não permitido.');
        }

        if (inscricao.status === 'CANCELADA') {
            throw new Error('Não é possível atualizar uma inscrição cancelada.');
        }

        return await prisma.inscricao.update({
            where: { id: Number(id) },
            data: {
                status: dados.status
            },
            include: {
                associado: {
                    include: { pessoa: true }
                },
                evento: true
            }
        });
    }

    // DELETE - Cancelar inscrição
    async cancelar(id) {
        const inscricao = await prisma.inscricao.findUnique({
            where: { id: Number(id) }
        });

        if (!inscricao) {
            throw new Error('Inscrição não encontrada.');
        }

        if (inscricao.status === 'CANCELADA') {
            throw new Error('Esta inscrição já está cancelada.');
        }

        return await prisma.inscricao.update({
            where: { id: Number(id) },
            data: {
                status: 'CANCELADA'
            }
        });
    }
}

module.exports = new InscricaoService();
