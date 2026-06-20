import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DenunciasModule } from './denuncias/denuncias.module';
import { PostosSaudeModule } from './postos-saude/postos-saude.module';

@Module({
  imports: [DenunciasModule, PostosSaudeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
