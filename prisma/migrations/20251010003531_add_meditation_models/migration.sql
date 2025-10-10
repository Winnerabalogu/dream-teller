-- CreateTable
CREATE TABLE "mantras" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "translation" TEXT,
    "category" TEXT NOT NULL,
    "element" TEXT NOT NULL,
    "energy" TEXT NOT NULL,
    "signs" TEXT[],
    "intention" TEXT NOT NULL,
    "pronunciation" TEXT,
    "repetitions" INTEGER NOT NULL DEFAULT 108,
    "bestTime" TEXT,
    "guide" JSONB,
    "origin" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mantras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quotes" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "element" TEXT NOT NULL,
    "energy" TEXT NOT NULL,
    "signs" TEXT[],
    "insight" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meditations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "difficulty" TEXT NOT NULL,
    "element" TEXT NOT NULL,
    "energy" TEXT NOT NULL,
    "signs" TEXT[],
    "benefits" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meditations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meditation_guides" (
    "id" TEXT NOT NULL,
    "meditationId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "tradition" TEXT NOT NULL,
    "steps" JSONB NOT NULL,
    "audioUrl" TEXT,
    "videoUrl" TEXT,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meditation_guides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rituals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "element" TEXT NOT NULL,
    "energy" TEXT NOT NULL,
    "signs" TEXT[],
    "items" TEXT[],
    "purpose" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rituals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ritual_guides" (
    "id" TEXT NOT NULL,
    "ritualId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tradition" TEXT NOT NULL,
    "steps" JSONB NOT NULL,
    "timing" TEXT,
    "preparation" TEXT NOT NULL,
    "closing" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ritual_guides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meditation_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mantraId" TEXT,
    "quoteId" TEXT,
    "meditationId" TEXT,
    "ritualId" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER,
    "mood" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "meditation_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "mantras_element_idx" ON "mantras"("element");

-- CreateIndex
CREATE INDEX "mantras_energy_idx" ON "mantras"("energy");

-- CreateIndex
CREATE INDEX "quotes_element_idx" ON "quotes"("element");

-- CreateIndex
CREATE INDEX "quotes_energy_idx" ON "quotes"("energy");

-- CreateIndex
CREATE INDEX "quotes_theme_idx" ON "quotes"("theme");

-- CreateIndex
CREATE INDEX "meditations_type_idx" ON "meditations"("type");

-- CreateIndex
CREATE INDEX "meditations_element_idx" ON "meditations"("element");

-- CreateIndex
CREATE INDEX "meditations_energy_idx" ON "meditations"("energy");

-- CreateIndex
CREATE INDEX "meditation_guides_meditationId_idx" ON "meditation_guides"("meditationId");

-- CreateIndex
CREATE INDEX "rituals_type_idx" ON "rituals"("type");

-- CreateIndex
CREATE INDEX "rituals_element_idx" ON "rituals"("element");

-- CreateIndex
CREATE INDEX "rituals_energy_idx" ON "rituals"("energy");

-- CreateIndex
CREATE INDEX "ritual_guides_ritualId_idx" ON "ritual_guides"("ritualId");

-- CreateIndex
CREATE INDEX "meditation_logs_userId_idx" ON "meditation_logs"("userId");

-- CreateIndex
CREATE INDEX "meditation_logs_date_idx" ON "meditation_logs"("date");

-- AddForeignKey
ALTER TABLE "meditation_guides" ADD CONSTRAINT "meditation_guides_meditationId_fkey" FOREIGN KEY ("meditationId") REFERENCES "meditations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ritual_guides" ADD CONSTRAINT "ritual_guides_ritualId_fkey" FOREIGN KEY ("ritualId") REFERENCES "rituals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meditation_logs" ADD CONSTRAINT "meditation_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
