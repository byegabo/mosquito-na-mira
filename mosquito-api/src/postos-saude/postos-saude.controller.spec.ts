import { Test, TestingModule } from '@nestjs/testing';
import { PostosSaudeController } from './postos-saude.controller';
import { PostosSaudeService } from './postos-saude.service';

describe('PostosSaudeController', () => {
  let controller: PostosSaudeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostosSaudeController],
      providers: [PostosSaudeService],
    }).compile();

    controller = module.get<PostosSaudeController>(PostosSaudeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
