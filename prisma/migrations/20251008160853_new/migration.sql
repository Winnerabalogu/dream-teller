/*
  Warnings:

  - You are about to drop the `symbols` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."symbols";

-- CreateTable
CREATE TABLE "Symbol" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "insight" TEXT,
    "keywords" TEXT[],
    "categoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Symbol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Symbol_key_key" ON "Symbol"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Symbol" ADD CONSTRAINT "Symbol_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
