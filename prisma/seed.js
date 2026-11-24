
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {

    // Criar pessoa de demonstração
    const pessoa = await prisma.pessoa.upsert({
        where: {
            cpf: '12345678900'
        },
        update: {},
        create: {
            nome: 'Participante Teste',
            cpf: '12345678900',
            email: 'participante@teste.com',
            telefone: '63999999999'
        }
    });

    // Criar associado
    const associado = await prisma.associado.upsert({
        where: {
            pessoaId: pessoa.id
        },
        update: {},
        create: {
            pessoaId: pessoa.id,
            status: 'ATIVO'
        }
    });

    // Criar evento de demonstração
    let evento = await prisma.evento.findFirst({
        where: {
            nome: 'Workshop AJEE 2.0'
        }
    });

    if (!evento) {
        evento = await prisma.evento.create({
            data: {
                nome: 'Workshop AJEE 2.0',
                dataInicio: new Date('2027-03-20T09:00:00'),
                dataFim: new Date('2027-03-20T17:00:00'),
                ativo: true
            }
        });
    }

    console.log('Dados de demonstração criados!');
    console.log('Associado ID:', associado.id);
    console.log('Evento ID:', evento.id);
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
