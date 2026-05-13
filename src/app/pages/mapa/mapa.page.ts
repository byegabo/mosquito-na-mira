import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, GoogleMapsModule]
})
export class MapaPage implements OnInit {
  centroMapa: google.maps.LatLngLiteral = { lat: -27.6485, lng: -48.6702 };
  zoom = 13;
  focosDenunciados: any[] = [];

  ngOnInit() {
    this.focosDenunciados = [
      { posicao: { lat: -27.6510, lng: -48.6750 }, raio: 400, cor: '#FF0000' },
      { posicao: { lat: -27.6420, lng: -48.6610 }, raio: 250, cor: '#FFA500' },
      { posicao: { lat: -27.6600, lng: -48.6800 }, raio: 150, cor: '#FFFF00' }
    ];
  }
}