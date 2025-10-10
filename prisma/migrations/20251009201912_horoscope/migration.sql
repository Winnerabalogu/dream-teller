-- CreateTable
CREATE TABLE "horoscopes" (
    "id" TEXT NOT NULL,
    "sign" TEXT NOT NULL,
    "element" TEXT NOT NULL,
    "rulingPlanet" TEXT NOT NULL,
    "traits" TEXT[],
    "strength" TEXT NOT NULL,
    "challenge" TEXT NOT NULL,
    "compatibleSigns" TEXT[],
    "todayTheme" TEXT NOT NULL,
    "advice" TEXT NOT NULL,
    "luckyNumber" INTEGER NOT NULL,
    "bestTime" TEXT NOT NULL,
    "lifeLesson" TEXT NOT NULL,
    "shadowAspect" TEXT NOT NULL,
    "spiritualGift" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "horoscopes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "horoscopes_sign_key" ON "horoscopes"("sign");
