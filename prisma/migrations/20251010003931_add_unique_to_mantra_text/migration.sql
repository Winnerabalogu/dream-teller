/*
  Warnings:

  - A unique constraint covering the columns `[text]` on the table `mantras` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "mantras_text_key" ON "mantras"("text");
