/*
  Warnings:

  - A unique constraint covering the columns `[text,author]` on the table `quotes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "quotes" ALTER COLUMN "insight" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "quotes_text_author_key" ON "quotes"("text", "author");
