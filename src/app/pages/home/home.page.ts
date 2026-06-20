import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { alertCircle, map, hardwareChip, megaphone, newspaper, search, helpCircle, medical } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class HomePage {
  totalDenuncias: number = 0;
  zonasRisco: number = 0;

  constructor(private http: HttpClient) {
    addIcons({ alertCircle, map, hardwareChip, megaphone, newspaper, search, helpCircle, medical });
  }

  ionViewWillEnter() {
    this.carregarEstatisticas();
  }

  carregarEstatisticas() {
    this.http.get<any[]>('http://localhost:3000/denuncias').subscribe({
      next: (denuncias) => {
        this.totalDenuncias = denuncias.length;
        this.calcularZonasRisco(denuncias);
      },
      error: (e) => console.error('Erro ao carregar estatísticas para a Home', e)
    });
  }

  calcularZonasRisco(denuncias: any[]) {
    const focosAgrupados: any[] = [];
    const RAIO_PROXIMIDADE = 0.005;

    denuncias.forEach(d => {
      let encontrou = false;
      for (let foco of focosAgrupados) {
        const distancia = Math.sqrt(Math.pow(foco.lat - d.latitude, 2) + Math.pow(foco.lng - d.longitude, 2));
        if (distancia < RAIO_PROXIMIDADE) {
          encontrou = true;
          break;
        }
      }
      if (!encontrou) {
        focosAgrupados.push({ lat: d.latitude, lng: d.longitude });
      }
    });

    this.zonasRisco = focosAgrupados.length;
  }
}