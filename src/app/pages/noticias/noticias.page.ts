import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class NoticiasPage {
  noticias = [
    { titulo: 'Ações de combate em Palhoça', resumo: 'Prefeitura intensifica fiscalização em terrenos baldios nesta semana.', data: '13 Mai 2026' },
    { titulo: 'Vacina da Dengue', resumo: 'Novos lotes da vacina chegam aos postos de saúde de Palhoça.', data: '10 Mai 2026' },
    { titulo: 'Cuidados com as chuvas', resumo: 'Como evitar acúmulo de água após as chuvas de verão.', data: '05 Mai 2026' }
  ];
}