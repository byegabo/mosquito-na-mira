import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-consultar-denuncia',
  templateUrl: './consultar-denuncia.page.html',
  styleUrls: ['./consultar-denuncia.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ConsultarDenunciaPage {
  protocolo: string = '';
  resultado: any = null;

  constructor(private http: HttpClient) {}

  consultar() {
    this.http.get(`http://localhost:3000/denuncias/${this.protocolo}`).subscribe({
      next: (data: any) => { this.resultado = data; },
      error: () => { alert('Protocolo não encontrado!'); }
   });
  }
}