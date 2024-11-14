-- CreateTable
CREATE TABLE `PatientConsultation` (
    `patient_medicine_id` INTEGER NOT NULL AUTO_INCREMENT,
    `patientId` INTEGER NOT NULL,
    `medicine_id_auto` INTEGER NOT NULL,
    `consultation_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`patient_medicine_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
