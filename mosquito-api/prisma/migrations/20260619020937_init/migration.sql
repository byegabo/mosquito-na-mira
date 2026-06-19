-- CreateTable
CREATE TABLE "Denuncia" (
    "id" TEXT NOT NULL,
    "protocolo" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Em Análise',
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "endereco" TEXT NOT NULL,
    "fotoUrl" TEXT,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Denuncia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Denuncia_protocolo_key" ON "Denuncia"("protocolo");
