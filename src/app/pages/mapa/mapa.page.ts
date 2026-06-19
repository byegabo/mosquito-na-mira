import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class MapaPage implements OnInit {
  mapa: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    setTimeout(() => this.iniciarMapa(), 500);
  }

  iniciarMapa() {
    this.mapa = L.map('mapaFocos').setView([-27.6325, -48.6688], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Mosquito na Mira - ADS'
    }).addTo(this.mapa);

    this.carregarFocosDoBanco();
  }

  carregarFocosDoBanco() {
    this.http.get<any[]>('http://localhost:3000/denuncias').subscribe({
      next: (denuncias) => {
        this.desenharCirculosInteligentes(denuncias);
      },
      error: (e) => console.error('Erro ao buscar denúncias do back-end', e)
    });
  }

  desenharCirculosInteligentes(denuncias: any[]) {
    const focosAgrupados: any[] = [];
    const RAIO_PROXIMIDADE = 0.005;

    denuncias.forEach(d => {
      let encontrouAreaProxima = false;
      
      for (let foco of focosAgrupados) {
        const distancia = Math.sqrt(Math.pow(foco.lat - d.latitude, 2) + Math.pow(foco.lng - d.longitude, 2));
        
        if (distancia < RAIO_PROXIMIDADE) {
          foco.peso += 1; 
          encontrouAreaProxima = true;
          break;
        }
      }
      
      if (!encontrouAreaProxima) {
        focosAgrupados.push({ lat: d.latitude, lng: d.longitude, peso: 1 });
      }
    });

    focosAgrupados.forEach(foco => {
      const raioCalculado = 150 + (foco.peso * 50); 
      
      L.circle([foco.lat, foco.lng], {
        color: 'red',
        fillColor: '#ff0000',
        fillOpacity: 0.5,
        radius: raioCalculado 
      }).addTo(this.mapa)
      .bindPopup(`<b>Zona de Alerta</b><br>Denúncias ativas nesta área: <b>${foco.peso}</b>`);
    });
  }
}