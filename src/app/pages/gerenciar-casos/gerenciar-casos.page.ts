import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-gerenciar-casos',
  templateUrl: './gerenciar-casos.page.html',
  styleUrls: ['./gerenciar-casos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class GerenciarCasosPage implements OnInit {

  todasDenuncias: any[] = [];
  denunciasFiltradas: any[] = [];
  filtroAtual: string = 'pendentes'; // Começa mostrando os casos não resolvidos
  denunciaExpandidaId: string | null = null; // Controla qual cartão está aberto

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.carregarDenuncias();
  }

  carregarDenuncias() {
    this.http.get('http://localhost:3000/denuncias').subscribe({
      next: (dados: any) => {
        this.todasDenuncias = dados;
        this.aplicarFiltro();
      },
      error: (erro) => console.error('Erro ao carregar', erro)
    });
  }

  aplicarFiltro() {
    if (this.filtroAtual === 'pendentes') {
      this.denunciasFiltradas = this.todasDenuncias.filter(d => d.status !== 'Resolvido');
    } else if (this.filtroAtual === 'resolvidos') {
      this.denunciasFiltradas = this.todasDenuncias.filter(d => d.status === 'Resolvido');
    } else {
      this.denunciasFiltradas = [...this.todasDenuncias];
    }
  }

  // Abre ou fecha os detalhes de um cartão
  alternarCard(id: string) {
    this.denunciaExpandidaId = this.denunciaExpandidaId === id ? null : id;
  }

  // Função para salvar a alteração no banco de dados
  salvarAlteracoes(denuncia: any) {
    const dadosAtualizados = {
      status: denuncia.status,
      observacoes: denuncia.observacoes
    };

    this.http.patch(`http://localhost:3000/denuncias/${denuncia.id}`, dadosAtualizados).subscribe({
      next: () => {
        alert('Denúncia atualizada com sucesso!');
        this.carregarDenuncias();
        this.denunciaExpandidaId = null;
      },
      error: (erro) => {
        console.error(erro);
        alert('Erro ao atualizar denúncia.');
      }
    });
  }

  corDoStatus(status: string): string {
    switch(status) {
      case 'Resolvido': return 'success';
      case 'Em Andamento': return 'warning';
      case 'Falso Alarme': return 'medium';
      default: return 'danger';
    }
  }
}