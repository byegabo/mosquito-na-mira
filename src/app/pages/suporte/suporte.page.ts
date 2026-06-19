import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-suporte',
  templateUrl: './suporte.page.html',
  styleUrls: ['./suporte.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class SuportePage {
  abrirWhatsApp() {
    window.open('https://wa.me/5548999999999', '_system');
  }
}