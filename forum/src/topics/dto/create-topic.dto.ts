/* eslint-disable prettier/prettier */
import { Category } from "../entities/category.enum";

export class CreateTopicDto {
    gameId: string;
    userId: string;
    theme: string;
    question: string;
    category: Category;
}
