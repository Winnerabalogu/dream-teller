/*
  Warnings:

  - A unique constraint covering the columns `[ritualId,title]` on the table `ritual_guides` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `rituals` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ritual_guides" ADD COLUMN     "tips" JSONB;

-- CreateIndex
CREATE UNIQUE INDEX "ritual_guides_ritualId_title_key" ON "ritual_guides"("ritualId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "rituals_name_key" ON "rituals"("name");
