-- DropIndex
DROP INDEX "configs_isActive_idx";

-- AlterTable
ALTER TABLE "cities" ADD COLUMN     "territoryId" TEXT,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "configs" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "states" ADD COLUMN     "coordinates" JSONB;

-- CreateTable
CREATE TABLE "territories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "coordinates" JSONB,
    "area" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "territories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "territories_name_idx" ON "territories"("name");

-- CreateIndex
CREATE INDEX "territories_countryId_idx" ON "territories"("countryId");

-- CreateIndex
CREATE INDEX "configs_key_idx" ON "configs"("key");

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_territoryId_fkey" FOREIGN KEY ("territoryId") REFERENCES "territories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "territories" ADD CONSTRAINT "territories_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
