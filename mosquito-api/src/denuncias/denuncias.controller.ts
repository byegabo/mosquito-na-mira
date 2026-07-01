import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { DenunciasService } from './denuncias.service';

@Controller('denuncias')
export class DenunciasController {
  constructor(private readonly denunciasService: DenunciasService) {}

  @Get('estatisticas')
  async obterEstatisticas() {
    return await this.denunciasService.obterEstatisticasDashboard();
  }

  @Post()
  criar(@Body() body: any) {
    return this.denunciasService.criarDenuncia(body);
  }

  @Get()
  listar() {
    return this.denunciasService.buscarTodas();
  }

  @Get('protocolo/:protocolo')
  buscarPorProtocolo(@Param('protocolo') protocolo: string) {
    return this.denunciasService.buscarPorProtocolo(protocolo);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() dados: any) {
    return this.denunciasService.atualizarDenuncia(id, dados);
  }
}