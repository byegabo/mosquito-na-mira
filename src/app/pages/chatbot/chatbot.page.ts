import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonContent } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { addIcons } from 'ionicons';
import { send, hardwareChip } from 'ionicons/icons';
  
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.page.html',
  styleUrls: ['./chatbot.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ChatbotPage {
  @ViewChild(IonContent, { static: false }) content!: IonContent;

  novaMensagem: string = '';
  mensagens: any [] = [
    { remetente: 'bot', texto: 'Olá! Sou o assistente virtual do Mosquito na Mira. Como posso ajudar você hoje?' }
  ];

  constructor(private http: HttpClient) {
    addIcons({ send, hardwareChip });
  }

  enviarMensagem() {
    if (this.novaMensagem.trim() === '') return;

    const textoUsuario = this.novaMensagem;

    this.mensagens.push({ remetente: 'usuario', texto: textoUsuario });
    this.novaMensagem = '';
    this.rolarParaBaixo();

    this.http.post('http://localhost:3000/chatbot/analisar', { mensagem: textoUsuario }).subscribe({
      next: (retorno: any) => {
        setTimeout(() => {
          this.mensagens.push({ remetente: 'bot', texto: retorno.resposta });
          this.rolarParaBaixo();
        }, 500);
      },
      error: () => {
        this.mensagens.push({ remetente: 'bot', texto: 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente mais tarde.' });
      }
    });
  }

  rolarParaBaixo() {
    setTimeout(() => {
      this.content.scrollToBottom(300);
    }, 100);
  }
}