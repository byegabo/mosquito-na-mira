import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-postos-saude',
  templateUrl: './postos-saude.page.html',
  styleUrls: ['./postos-saude.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class PostosSaudePage {
  postos = [
    { nome: 'UBS Centro', endereco: 'R. Ver. Osvaldo de Oliveira, Centro', tel: '3220-0300' },
    { nome: 'UBS Ponte do Imaruim', endereco: 'R. Antônio Vieira, Ponte do Imaruim', tel: '3220-0301' },
    { nome: 'UBS Bela Vista', endereco: 'R. José Cosme Pamplona, Bela Vista', tel: '3220-0302' }
  ];

  tracarRota(endereco: string) {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco + ', Palhoça - SC')}`, '_blank');
  }

  ligar(telefone: string) {
    window.open(`tel:${telefone}`, '_system');
  }
}