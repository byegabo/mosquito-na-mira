import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DenunciasService {
  constructor(private prisma: PrismaService) {}

  async criarDenuncia(dados: any) {
    const ano = new Date().getFullYear(); 
    const numerosAleatorios = Math.floor(1000 + Math.random() * 9000); 
    const protocoloGerado = `DEN-${ano}-${numerosAleatorios}`;

    return this.prisma.denuncia.create({
      data: {
        protocolo: protocoloGerado,
        latitude: dados.latitude,
        longitude: dados.longitude,
        fotoUrl: dados.fotoUrl,
        
        cep: dados.cep,
        rua: dados.rua,
        numero: dados.numero,
        bairro: dados.bairro,
        municipio: dados.municipio,
        complemento: dados.complemento,
        
        descricao: dados.descricao,
        anonimo: dados.anonimo || false, 
        cpf: dados.cpf,
        nome: dados.nome,
        permiteContato: dados.permiteContato || false,
        telefone: dados.telefone,
      },
    });
  }

  async buscarTodas() {
    return this.prisma.denuncia.findMany();
  }

  async buscarPorProtocolo(numeroProtocolo: string) {
    const denuncia = await this.prisma.denuncia.findUnique({
      where: { protocolo: numeroProtocolo },
    });

    if (!denuncia) {
      return null; 
    }

    return denuncia;
  }
  
  async obterEstatisticasDashboard() {
    try {
      const total = await this.prisma.denuncia.count();
      
      const ativos = await this.prisma.denuncia.count({
        where: { status: { in: ['Em Análise', 'Homologado', 'Em andamento'] } }
      });

      const eliminados = await this.prisma.denuncia.count({
        where: { status: 'Concluído' }
      });

      return { total: total || 0, ativos: ativos || 0, eliminados: eliminados || 0 };

    } catch (error) {
      console.error('Erro no Prisma:', error);
      return { total: 0, ativos: 0, eliminados: 0 };
    }
  }

  async atualizarDenuncia(id: string, dadosAtualizacao: { status?: string, observacoes?: string }) {
    return this.prisma.denuncia.update({
      where: { id },
      data: dadosAtualizacao,
    });
  }
}