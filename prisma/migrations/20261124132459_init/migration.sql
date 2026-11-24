-- CreateTable
CREATE TABLE "Pessoa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT
);

-- CreateTable
CREATE TABLE "Associado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pessoaId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ATIVO',
    "dataFiliacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Associado_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "dataInicio" DATETIME NOT NULL,
    "dataFim" DATETIME NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Inscricao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "associadoId" INTEGER NOT NULL,
    "eventoId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "qrCode" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Inscricao_associadoId_fkey" FOREIGN KEY ("associadoId") REFERENCES "Associado" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Inscricao_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pagamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "inscricaoId" INTEGER NOT NULL,
    "valor" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "dataPagamento" DATETIME,
    CONSTRAINT "Pagamento_inscricaoId_fkey" FOREIGN KEY ("inscricaoId") REFERENCES "Inscricao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Certificado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "inscricaoId" INTEGER NOT NULL,
    "codigo" TEXT NOT NULL,
    "dataEmissao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Certificado_inscricaoId_fkey" FOREIGN KEY ("inscricaoId") REFERENCES "Inscricao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "tipo" TEXT NOT NULL DEFAULT 'ASSOCIADO',
    "resetTokenHash" TEXT,
    "resetTokenExpiresAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "associadoId" INTEGER,
    CONSTRAINT "Usuario_associadoId_fkey" FOREIGN KEY ("associadoId") REFERENCES "Associado" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_cpf_key" ON "Pessoa"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_email_key" ON "Pessoa"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Associado_pessoaId_key" ON "Associado"("pessoaId");

-- CreateIndex
CREATE UNIQUE INDEX "Inscricao_uuid_key" ON "Inscricao"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Inscricao_associadoId_eventoId_key" ON "Inscricao"("associadoId", "eventoId");

-- CreateIndex
CREATE UNIQUE INDEX "Pagamento_inscricaoId_key" ON "Pagamento"("inscricaoId");

-- CreateIndex
CREATE UNIQUE INDEX "Certificado_inscricaoId_key" ON "Certificado"("inscricaoId");

-- CreateIndex
CREATE UNIQUE INDEX "Certificado_codigo_key" ON "Certificado"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_associadoId_key" ON "Usuario"("associadoId");
