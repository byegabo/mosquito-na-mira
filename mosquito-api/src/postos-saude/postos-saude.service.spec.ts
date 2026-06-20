import { Test, TestingModule } from '@nestjs/testing';
import { PostosSaudeService } from './postos-saude.service';

describe('PostosSaudeService', () => {
  let service: PostosSaudeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostosSaudeService],
    }).compile();

    service = module.get<PostosSaudeService>(PostosSaudeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
