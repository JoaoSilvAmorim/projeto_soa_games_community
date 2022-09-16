/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnswersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAnswerDto: CreateAnswerDto) {
    const answer = {
      ...createAnswerDto,
    }

    const data = new Date();

    const br = new Date(data.setHours(data.getHours() - 3));
    
    const created = await this.prisma.answers.create({
      data: {...answer, createdAt: br, updatedAt: br},
    })
    return created;
  }

  async findAll() {
    const finds = await this.prisma.answers.findMany();

    return finds;
  }

  async findOne(id: string) {
    const find = await this.prisma.answers.findUnique({where: {id: id}});
    
    return find;
  }

  async findByUser(userId: string) {
    const find = await this.prisma.answers.findMany({where: {userId: userId}});

    return find;
  }

  async update(id: string, updateAnswerDto: UpdateAnswerDto) {
    const answer = await this.findOne(id);

    const data = new Date();

    const br = new Date(data.setHours(data.getHours() - 3));

    const attTopic = await this.prisma.answers.update({
      where: {id: answer.id},
      data: {...updateAnswerDto, id: answer.id, createdAt: answer.createdAt, updatedAt: br},
    })
    return attTopic;
  }

  async remove(id: string) {
    const answer = await this.findOne(id);
    const topic = await this.prisma.topics.findUnique({where: {id: answer.topicId}});

    await this.prisma.answers.delete({where: {id: answer.id}});
    return `A resposta ao tópico ${topic.theme} foi deletada com sucesso!`;
  }
}
