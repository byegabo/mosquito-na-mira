import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { 
  alertCircle, warning, checkmarkDoneCircle, trendingUp,
  searchOutline, syncOutline, checkmarkCircleOutline, closeCircleOutline
} from 'ionicons/icons';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule] 
})
export class DashboardPage implements OnInit {
  
  estatisticas = {
    emAnalise: 0,
    emAndamento: 0,
    resolvido: 0,
    falsoAlarme: 0
  };

  carregando: boolean = true;
  meuGrafico: any;

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
    addIcons({ 
      alertCircle, warning, checkmarkDoneCircle, trendingUp,
      searchOutline, syncOutline, checkmarkCircleOutline, closeCircleOutline
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
    this.buscarEstatisticas(); 
  }

  buscarEstatisticas() {
    this.carregando = true;
    const urlApi = 'http://localhost:3000/denuncias/estatisticas';

    this.http.get<any>(urlApi).subscribe({
      next: (resposta) => {
        this.estatisticas.emAnalise = resposta.emAnalise || 0;
        this.estatisticas.emAndamento = resposta.emAndamento || 0;
        this.estatisticas.resolvido = resposta.resolvido || 0;
        this.estatisticas.falsoAlarme = resposta.falsoAlarme || 0;
        
        this.carregando = false;
        
        this.renderizarGrafico();
      },
      error: (erro) => {
        console.error('Erro ao buscar estatísticas do banco de dados:', erro);
        this.carregando = false;
         
        this.renderizarGrafico();
      }
    });
  }

  renderizarGrafico() {
    const canvas = document.getElementById('graficoStatus') as HTMLCanvasElement;
    
    if (!canvas) return;

    if (this.meuGrafico) {
      this.meuGrafico.destroy();
    }

    this.meuGrafico = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Em Análise', 'Em Andamento', 'Resolvido', 'Falso Alarme'],
        datasets: [{
          data: [
            this.estatisticas.emAnalise, 
            this.estatisticas.emAndamento, 
            this.estatisticas.resolvido, 
            this.estatisticas.falsoAlarme
          ],
          backgroundColor: [
            '#f44336',
            '#ffb300',
            '#4caf50',
            '#9e9e9e'  
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }
}