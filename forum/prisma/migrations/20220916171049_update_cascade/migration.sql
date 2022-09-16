-- DropForeignKey
ALTER TABLE `answers` DROP FOREIGN KEY `Answers_topicId_fkey`;

-- AddForeignKey
ALTER TABLE `Answers` ADD CONSTRAINT `Answers_topicId_fkey` FOREIGN KEY (`topicId`) REFERENCES `Topics`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
