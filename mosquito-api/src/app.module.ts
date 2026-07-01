import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DenunciasModule } from './denuncias/denuncias.module';
import { PostosSaudeModule } from './postos-saude/postos-saude.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DenunciasModule, PostosSaudeModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
