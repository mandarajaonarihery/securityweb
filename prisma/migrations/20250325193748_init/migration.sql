/*
  Warnings:

  - The primary key for the `Medecin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Medecin` table. All the data in the column will be lost.
  - The `numed` column on the `Medecin` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "Medecin_numed_key";

-- AlterTable
ALTER TABLE "Medecin" DROP CONSTRAINT "Medecin_pkey",
DROP COLUMN "id",
DROP COLUMN "numed",
ADD COLUMN     "numed" SERIAL NOT NULL,
ADD CONSTRAINT "Medecin_pkey" PRIMARY KEY ("numed");
