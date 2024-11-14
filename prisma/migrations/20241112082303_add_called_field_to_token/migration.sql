-- CreateTable
CREATE TABLE `Token` (
    `tokenId` INTEGER NOT NULL AUTO_INCREMENT,
    `tokenNumber` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `issuedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `called` BOOLEAN NOT NULL DEFAULT false,
    `patientId` INTEGER NOT NULL,

    UNIQUE INDEX `Token_tokenNumber_key`(`tokenNumber`),
    INDEX `Token_patientId_idx`(`patientId`),
    PRIMARY KEY (`tokenId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`patientId`) ON DELETE RESTRICT ON UPDATE CASCADE;
