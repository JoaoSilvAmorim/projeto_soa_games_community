/*
  Warnings:

  - You are about to alter the column `release_date` on the `game` table. The data in that column could be lost. The data in that column will be cast from `VarChar(800)` to `DateTime(3)`.
  - A unique constraint covering the columns `[title]` on the table `Game` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `game` MODIFY `release_date` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Game_title_key` ON `Game`(`title`);
