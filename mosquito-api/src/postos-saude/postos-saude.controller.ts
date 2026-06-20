import { Controller, Get } from '@nestjs/common';
import { PostosSaudeService } from './postos-saude.service';

@Controller('postos-saude')
export class PostosSaudeController {
  constructor(private readonly postosSaudeService: PostosSaudeService) {}

  @Get()
  findAll() {
    return this.postosSaudeService.findAll();
  }
}