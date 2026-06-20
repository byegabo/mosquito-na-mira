import { Module } from '@nestjs/common';
import { PostosSaudeService } from './postos-saude.service';
import { PostosSaudeController } from './postos-saude.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [PostosSaudeController],
  providers: [PostosSaudeService, PrismaService],
})
export class PostosSaudeModule {}
