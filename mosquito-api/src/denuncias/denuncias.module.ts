import { Module } from '@nestjs/common';
import { DenunciasService } from './denuncias.service';
import { DenunciasController } from './denuncias.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [DenunciasController],
  providers: [DenunciasService, PrismaService],
})
export class DenunciasModule {}