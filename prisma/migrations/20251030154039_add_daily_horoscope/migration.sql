-- CreateTable
CREATE TABLE "DailyHoroscope" (
    "id" TEXT NOT NULL,
    "sign" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "advice" TEXT NOT NULL,
    "affirmation" TEXT NOT NULL,
    "energyLevel" INTEGER NOT NULL,
    "energyDescription" TEXT NOT NULL,
    "focusAreas" TEXT[],
    "luckyElement" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyHoroscope_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DailyHoroscope_sign_idx" ON "DailyHoroscope"("sign");

-- CreateIndex
CREATE INDEX "DailyHoroscope_date_idx" ON "DailyHoroscope"("date");

-- CreateIndex
CREATE UNIQUE INDEX "DailyHoroscope_sign_date_key" ON "DailyHoroscope"("sign", "date");
