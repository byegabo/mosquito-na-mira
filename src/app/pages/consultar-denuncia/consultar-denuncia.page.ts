import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-consultar-denuncia',
  templateUrl: './consultar-denuncia.page.html',
  styleUrls: ['./consultar-denuncia.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class ConsultarDenunciaPage {
  
  protocolo: string = '';
  resultado: any = null; 

  constructor(private http: HttpClient) {}

  consultar() {
    if (!this.protocolo) {
      alert('Digite o número do protocolo.');
      return;
    }


    const protocoloLimpo = this.protocolo.trim();
    const protocoloCodificado = encodeURIComponent(protocoloLimpo);

    this.http.get(`http://localhost:3000/denuncias/protocolo/${protocoloCodificado}`)
      .subscribe({
        next: (resposta: any) => {
          this.resultado = Array.isArray(resposta) ? resposta[0] : resposta;
          
          if (!this.resultado) {
            alert('Nenhuma denúncia encontrada com este número.');
          }
        },
        error: (erro) => {
          console.error('Erro detalhado:', erro);
          alert('Erro ao buscar o protocolo. Verifique o número digitado.');
          this.resultado = null;
        }
      });
  }
}