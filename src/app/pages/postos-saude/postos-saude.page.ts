import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { medical, location, time, call, navigate } from 'ionicons/icons';

@Component({
  selector: 'app-postos-saude',
  templateUrl: './postos-saude.page.html',
  styleUrls: ['./postos-saude.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class PostosSaudePage {
  
  postos: any[] = [];

  constructor(private http: HttpClient) {
    addIcons({ medical, location, time, call, navigate });
  }

  ionViewWillEnter() {
    this.http.get<any[]>('http://localhost:3000/postos-saude').subscribe({
      next: (dadosDoBanco) => {
        this.postos = dadosDoBanco;
      },
      error: (e) => console.error('Erro ao buscar postos', e)
    });
  }

  tracarRota(endereco: string) {
    const enderecoFormatado = encodeURIComponent(endereco);
    const linkMaps = `https://www.google.com/maps/search/?api=1&query=${enderecoFormatado}`;
    window.open(linkMaps, '_system');
  }

  ligar(telefone: string) {
    window.open(`tel:${telefone}`, '_system');
  }
}