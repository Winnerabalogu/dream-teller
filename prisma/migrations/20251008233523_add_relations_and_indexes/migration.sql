-- DropForeignKey
ALTER TABLE "public"."Symbol" DROP CONSTRAINT "Symbol_categoryId_fkey";

-- AlterTable
ALTER TABLE "Symbol" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "Symbol_categoryId_idx" ON "Symbol"("categoryId");

-- CreateIndex
CREATE INDEX "dreams_date_idx" ON "dreams"("date");

-- AddForeignKey
ALTER TABLE "Symbol" ADD CONSTRAINT "Symbol_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reflections" ADD CONSTRAINT "reflections_dreamId_fkey" FOREIGN KEY ("dreamId") REFERENCES "dreams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
