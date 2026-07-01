import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async cadastrarCidadao(dados: any) {
    const { confirmarSenha, ...dadosParaSalvar } = dados; 
    return this.prisma.cidadao.create({ data: dadosParaSalvar });
  }

  async cadastrarAgente(dados: any) {
    const { confirmarSenha, ...dadosParaSalvar } = dados;
    return this.prisma.agente.create({ data: dadosParaSalvar });
  }

  async login(dados: any) {
    const { email, senha, tipo } = dados;
    let usuario;

    if (tipo === 'agente') {
      usuario = await this.prisma.agente.findUnique({ where: { email } });
    } else {
      usuario = await this.prisma.cidadao.findFirst({
        where: { OR: [{ email: email }, { cpf: email }] }
      });
    }

    if (!usuario || usuario.senha !== senha) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const { senha: _, ...usuarioSemSenha } = usuario;
    return { mensagem: 'Login aprovado', usuario: usuarioSemSenha, tipo };
  }
}