/*
  Warnings:

  - You are about to drop the column `yesEmoji` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `noEmoji` on the `Problem` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Problem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL,
    "answer" BOOLEAN NOT NULL,
    "correct" TEXT NOT NULL,
    "incorrect" TEXT NOT NULL
);
INSERT INTO "new_Problem" ("id", "question", "answer", "correct", "incorrect") SELECT "id", "question", "answer", "correct", "incorrect" FROM "Problem";
DROP TABLE "Problem";
ALTER TABLE "new_Problem" RENAME TO "Problem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
