/*
  Warnings:

  - A unique constraint covering the columns `[meditationId,title]` on the table `meditation_guides` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `meditations` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "meditation_guides" ADD COLUMN     "closing" TEXT,
ADD COLUMN     "preparation" TEXT,
ADD COLUMN     "tips" JSONB,
ALTER COLUMN "duration" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "meditation_guides_meditationId_title_key" ON "meditation_guides"("meditationId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "meditations_name_key" ON "meditations"("name");
