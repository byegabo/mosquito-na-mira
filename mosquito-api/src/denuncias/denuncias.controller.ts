import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DenunciasService } from './denuncias.service';

@Controller('denuncias')
export class DenunciasController {
  constructor(private readonly denunciasService: DenunciasService) {}

  @Post()
  criar(@Body() body: any) {
    return this.denunciasService.criarDenuncia(body);
  }

  @Get()
  listar() {
    return this.denunciasService.buscarTodas();
  }
  @Get(':protocolo')
  buscarPorProtocolo(@Param('protocolo') protocolo: string) {
    return this.denunciasService.buscarPorProtocolo(protocolo);
  }

}