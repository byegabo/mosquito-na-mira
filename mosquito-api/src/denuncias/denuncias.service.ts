import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DenunciasService {
  constructor(private prisma: PrismaService) {}

  async criarDenuncia(dados: any) {
    const protocoloGerado = 'MNM-' + Math.floor(10000 + Math.random() * 90000);

    return this.prisma.denuncia.create({
      data: {
        protocolo: protocoloGerado,
        latitude: dados.latitude,
        longitude: dados.longitude,
        endereco: dados.endereco,
        fotoUrl: dados.fotoUrl,
      },
    });
  }

  async buscarTodas() {
    return this.prisma.denuncia.findMany();
  }

  async buscarPorProtocolo(protocolo: string) {
  return this.prisma.denuncia.findUnique({
    where: { protocolo: protocolo }
  });
}
}