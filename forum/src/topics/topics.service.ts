/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Injectable()
export class TopicsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTopicDto: CreateTopicDto) {
    const topic = {
      ...createTopicDto,
    }

    const data = new Date();

    const br = new Date(data.setHours(data.getHours() - 3));
    
    const created = await this.prisma.topics.create({
      data: {...topic, createdAt: br, updatedAt: br},
    })
    return created;
  }

  async findAll() {
    const finds = await this.prisma.topics.findMany();

    return finds;
  }

  async findOne(id: string) {
    const find = await this.prisma.topics.findUnique({where: {id: id}});
    
    return find;
  }

  async findByCategory(category: string) {
    const find = await this.prisma.topics.findMany({where: {category: category}});

    return find;
  }

  async findByUser(userId: string) {
    const find = await this.prisma.topics.findMany({where: {userId: userId}});

    return find;
  }

  async update(id: string, updateTopicDto: UpdateTopicDto) {
    const topic = await this.findOne(id);

    const data = new Date();

    const br = new Date(data.setHours(data.getHours() - 3));

    const attTopic = await this.prisma.topics.update({
      where: {id: topic.id},
      data: {...updateTopicDto, id: topic.id, createdAt: topic.createdAt, updatedAt: br},
    })
    return attTopic;
  }

  async remove(id: string) {
    const topic = await this.findOne(id);

    await this.prisma.topics.delete({where: {id: topic.id}});
    return `Tópico ${topic.theme} deletado com sucesso!`;
  }
}