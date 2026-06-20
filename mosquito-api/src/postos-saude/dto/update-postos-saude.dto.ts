import { PartialType } from '@nestjs/mapped-types';
import { CreatePostosSaudeDto } from './create-postos-saude.dto';

export class UpdatePostosSaudeDto extends PartialType(CreatePostosSaudeDto) {}
