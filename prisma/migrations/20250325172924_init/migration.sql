-- CreateTable
CREATE TABLE "Medecin" (
    "id" SERIAL NOT NULL,
    "numed" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "nombreJours" INTEGER NOT NULL,
    "tauxJournalier" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Medecin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Medecin_numed_key" ON "Medecin"("numed");
