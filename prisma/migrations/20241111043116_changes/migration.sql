/*
  Warnings:

  - The primary key for the `medicine` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[medicine_id_auto]` on the table `Medicine` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[medicine_id]` on the table `Medicine` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `medicine` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`medicine_id_auto`, `medicine_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Medicine_medicine_id_auto_key` ON `Medicine`(`medicine_id_auto`);

-- CreateIndex
CREATE UNIQUE INDEX `Medicine_medicine_id_key` ON `Medicine`(`medicine_id`);
