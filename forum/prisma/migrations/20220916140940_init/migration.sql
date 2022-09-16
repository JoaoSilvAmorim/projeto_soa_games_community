-- CreateTable
CREATE TABLE `Topics` (
    `id` VARCHAR(191) NOT NULL,
    `gameId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `theme` VARCHAR(191) NOT NULL,
    `question` VARCHAR(8000) NOT NULL,
    `category` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Answers` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `topicId` VARCHAR(191) NOT NULL,
    `answer` VARCHAR(8000) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Answers` ADD CONSTRAINT `Answers_topicId_fkey` FOREIGN KEY (`topicId`) REFERENCES `Topics`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
