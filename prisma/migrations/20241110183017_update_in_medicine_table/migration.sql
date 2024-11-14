/*
  Warnings:

  - The primary key for the `medicine` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `medicine_id_auto` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `medicine` DROP PRIMARY KEY,
    ADD COLUMN `medicine_id_auto` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `medicine_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`medicine_id_auto`);
