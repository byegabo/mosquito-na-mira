import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { helpBuoy, logoWhatsapp, mail, chevronDown, chatbubbles } from 'ionicons/icons';

@Component({
  selector: 'app-suporte',
  templateUrl: './suporte.page.html',
  styleUrls: ['./suporte.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class SuportePage {

  constructor() {
    addIcons({ helpBuoy, logoWhatsapp, mail, chevronDown, chatbubbles });
  }

  abrirWhatsApp() {
    const numero = '5548999999999'; 
    const mensagem = encodeURIComponent('Olá! Preciso de ajuda com o aplicativo Mosquito na Mira.');
    window.open(`https://wa.me/${numero}?text=${mensagem}`, '_system');
  }

  enviarEmail() {
    const email = 'suporte@mosquitonamira.com';
    const assunto = encodeURIComponent('Dúvida sobre o Aplicativo');
    window.open(`mailto:${email}?subject=${assunto}`, '_system');
  }
}