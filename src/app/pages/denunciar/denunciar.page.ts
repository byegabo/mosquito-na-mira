import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { addIcons } from 'ionicons';
import { locationOutline, cameraOutline, imageOutline } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-denunciar',
  templateUrl: './denunciar.page.html',
  styleUrls: ['./denunciar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DenunciarPage implements OnInit {
  
  protocoloRecebido: string = '';

  form = {
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    municipio: '',
    complemento: '',
    descricao: '',
    anonimo: false,
    cpf: '',
    nome: '',
    permiteContato: false,
    telefone: '',
    latitude: 0,
    longitude: 0,
    fotoUrl: ''
  };

  cameraSource = CameraSource;

  constructor(private http: HttpClient, private router: Router) {
    addIcons({ locationOutline, cameraOutline, imageOutline });
  }

  ngOnInit() {
  }

  async pegarLocalizacao() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.form.latitude = coordinates.coords.latitude;
      this.form.longitude = coordinates.coords.longitude;
      console.log('GPS capturado com sucesso!', this.form.latitude, this.form.longitude);
      alert('Localização capturada com sucesso!');
    } catch (e) {
      console.error('Erro ao pegar o GPS:', e);
      alert('Não conseguimos capturar seu GPS. Verifique se a localização está ativada.');
    }
  }

  async tirarFoto(origem: CameraSource) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: origem 
      });
      
      this.form.fotoUrl = image.dataUrl!;
      alert('Foto anexada com sucesso!');
    } catch (error) {
      console.log('Captura de foto cancelada ou com erro', error);
    }
  }

  verificarAnonimato() {
    if (this.form.anonimo) {
      this.form.nome = '';
      this.form.cpf = '';
    }
  }

  enviar() {
    if (!this.form.rua || !this.form.bairro || !this.form.municipio) {
      alert('Por favor, preencha a Rua, Bairro e Município antes de enviar.');
      return;
    }

    this.http.post('http://localhost:3000/denuncias', this.form).subscribe({
      next: (resposta: any) => {
        this.protocoloRecebido = resposta.protocolo;
        this.limparFormulario();
      },
      error: (erro) => {
        console.error(erro);
        alert('Erro ao conectar com o servidor.');
      }
    });
  }

  voltarInicio() {
    this.protocoloRecebido = '';
    this.router.navigate(['/home']);
  }

  limparFormulario() {
    this.form = {
      cep: '', rua: '', numero: '', bairro: '', municipio: '', complemento: '',
      descricao: '', anonimo: false, cpf: '', nome: '', permiteContato: false,
      telefone: '', latitude: 0, longitude: 0, fotoUrl: ''
    };
  }
}