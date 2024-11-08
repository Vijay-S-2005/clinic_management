-- CreateTable
CREATE TABLE `Medicine` (
    `medicine_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `groupName` VARCHAR(191) NOT NULL,
    `dosageForm` VARCHAR(191) NOT NULL,
    `strength` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `expiryDate` DATETIME(3) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `notes` VARCHAR(191) NULL,

    PRIMARY KEY (`medicine_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
