import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { 
  alertCircle, warning, checkmarkDoneCircle, trendingUp 
} from 'ionicons/icons';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule] 
})
export class DashboardPage implements OnInit {
  
  casosConfirmados: number = 0;
  focosAtivos: number = 0;
  focosEliminados: number = 0;
  carregando: boolean = true;

  filtros = {
    regiao: 'Sul',
    uf: 'SC',
    municipio: 'Palhoça',
    ano: '2026', 
    casos: 'Sim'
  };

  cidadesPorUF: { [key: string]: string[] } = {
    'SC': ['Palhoça', 'Florianópolis', 'São José'],
    'PR': ['Curitiba', 'Londrina', 'Maringá'],
    'RS': ['Porto Alegre', 'Caxias do Sul', 'Pelotas']
  };

  municipiosDisponiveis: string[] = [];

  constructor(private http: HttpClient) {
    addIcons({ alertCircle, warning, checkmarkDoneCircle, trendingUp });
  }

  async criarGrafico() {
  const ctx = document.getElementById('myChart') as HTMLCanvasElement;
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Em Análise', 'Em Andamento', 'Resolvido', 'Falso Alarme'],
      datasets: [{
        data: [12, 5, 20, 2],
        backgroundColor: ['#ffc107', '#3880ff', '#2dd36f', '#92949c']
      }]
    }
  });
}
  ngOnInit() {
    this.municipiosDisponiveis = this.cidadesPorUF[this.filtros.uf];
    this.buscarEstatisticas();
  }

  atualizarMunicipios() {
    this.municipiosDisponiveis = this.cidadesPorUF[this.filtros.uf];
    this.filtros.municipio = this.municipiosDisponiveis[0]; 
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    console.log('Novos filtros selecionados:', this.filtros);
  }

  buscarEstatisticas() {
    const urlApi = 'http://localhost:3000/denuncias/estatisticas';

    this.http.get<any>(urlApi).subscribe({
      next: (resposta) => {
        this.casosConfirmados = resposta.total;
        this.focosAtivos = resposta.ativos;
        this.focosEliminados = resposta.eliminados;
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao buscar estatísticas do banco de dados:', erro);
        this.carregando = false;
      }
    });
  }
}