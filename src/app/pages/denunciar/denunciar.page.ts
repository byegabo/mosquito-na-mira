import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-denunciar',
  templateUrl: './denunciar.page.html',
  styleUrls: ['./denunciar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DenunciarPage implements OnInit {
  endereco: string = '';
  latitude: number = 0;
  longitude: number = 0; 
  fotoUrl: string = 'https://via.placeholder.com/150';

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    await this.capturarLocalizacao();
  }

  async capturarLocalizacao() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
      console.log('GPS capturado com sucesso!', this.latitude, this.longitude);
    } catch (e) {
      console.error('Erro ao pegar o GPS:', e);
      alert('Não conseguimos capturar seu GPS. Verifique se a localização está ativada.');
    }
  }

  async tirarFoto() {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.DataUrl 
  });
  this.fotoUrl = image.dataUrl!;
}

  enviarDenuncia() {
    const dadosParaEnviar = {
      endereco: this.endereco,
      latitude: this.latitude,
      longitude: this.longitude,
      fotoUrl: this.fotoUrl
    };

    this.http.post('http://localhost:3000/denuncias', dadosParaEnviar).subscribe({
      next: (resposta: any) => {
        alert(`Denúncia enviada com sucesso! Guarde seu protocolo: ${resposta.protocolo}`);
        this.endereco = '';
      },
      error: (erro) => {
        console.error(erro);
        alert('Erro ao conectar com o servidor.');
      }
    });
  }
}