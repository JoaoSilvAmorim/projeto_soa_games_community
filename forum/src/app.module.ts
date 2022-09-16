import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TopicsModule } from './topics/topics.module';
import { AnswersModule } from './answers/answers.module';

@Module({
  imports: [TopicsModule, AnswersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
