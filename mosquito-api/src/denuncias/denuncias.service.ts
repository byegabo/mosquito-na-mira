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
      const grupos = await this.prisma.denuncia.groupBy({
        by: ['status'],
        _count: { status: true }
      });

      const estatisticas = {
        emAnalise: 0,
        emAndamento: 0,
        resolvido: 0,
        falsoAlarme: 0
      };

      grupos.forEach(grupo => {
        if (grupo.status === 'Em Análise') estatisticas.emAnalise = grupo._count.status;
        if (grupo.status === 'Em Andamento') estatisticas.emAndamento = grupo._count.status;
        if (grupo.status === 'Resolvido') estatisticas.resolvido = grupo._count.status;
        if (grupo.status === 'Falso Alarme') estatisticas.falsoAlarme = grupo._count.status;
      });

      return estatisticas;

    } catch (error) {
      console.error('Erro no Prisma ao buscar estatísticas:', error);
      return { emAnalise: 0, emAndamento: 0, resolvido: 0, falsoAlarme: 0 };
    }
  }

  async atualizarDenuncia(id: string, dadosAtualizacao: { status?: string, observacoes?: string }) {
    return this.prisma.denuncia.update({
      where: { id },
      data: dadosAtualizacao,
    });
  }
}