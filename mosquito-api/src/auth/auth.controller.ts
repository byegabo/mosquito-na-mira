import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('cadastro-cidadao')
  cadastrarCidadao(@Body() dados: any) {
    return this.authService.cadastrarCidadao(dados);
  }

  @Post('cadastro-agente')
  cadastrarAgente(@Body() dados: any) {
    return this.authService.cadastrarAgente(dados);
  }

  @Post('login')
  login(@Body() dados: any) {
    return this.authService.login(dados);
  }
}