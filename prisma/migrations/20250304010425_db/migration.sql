/*
  Warnings:

  - The primary key for the `Anunce` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `Anunce` table. All the data in the column will be lost.
  - You are about to drop the column `countrieId` on the `Anunce` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Anunce` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Anunce` table. All the data in the column will be lost.
  - The primary key for the `Player` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `Player` table. All the data in the column will be lost.
  - Added the required column `countryId` to the `Anunce` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Anunce` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryId` to the `Player` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Player` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `ideology` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rankId` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Npc" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "countryId" INTEGER NOT NULL,
    "ideology" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "rankId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Npc_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Npc_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "Rank" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Rank" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "permission" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Country" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Anunce" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "countryId" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    CONSTRAINT "Anunce_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Anunce" ("category", "content", "description", "image", "title") SELECT "category", "content", "description", "image", "title" FROM "Anunce";
DROP TABLE "Anunce";
ALTER TABLE "new_Anunce" RENAME TO "Anunce";
CREATE TABLE "new_Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "countryId" INTEGER NOT NULL,
    "ideology" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "rankId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Player_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Player_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "Rank" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Player" ("createdAt", "name", "updatedAt") SELECT "createdAt", "name", "updatedAt" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
