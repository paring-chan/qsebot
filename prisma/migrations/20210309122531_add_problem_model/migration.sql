-- CreateTable
CREATE TABLE "Problem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "yesEmoji" TEXT NOT NULL,
    "noEmoji" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" BOOLEAN NOT NULL,
    "correct" TEXT NOT NULL,
    "incorrect" TEXT NOT NULL
);
