import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-denunciar',
  templateUrl: './denunciar.page.html',
  styleUrls: ['./denunciar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class DenunciarPage implements OnInit {
  denunciaForm: FormGroup;
  fotoFoco: string | undefined;
  coordenadas: any;
  carregandoLocalizacao = false;

  constructor(
    private fb: FormBuilder,
    private toastController: ToastController
  ) {
    this.denunciaForm = this.fb.group({
      endereco: ['', Validators.required],
      descricao: [''],
      anonimo: [false]
    });
  }

  ngOnInit() {
    this.pegarLocalizacao();
  }

  async tirarFoto() {
    const image = await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.fotoFoco = image.dataUrl;
  }

  async pegarLocalizacao() {
    this.carregandoLocalizacao = true;
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.coordenadas = {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude
      };
    } catch (e) {
      this.mostrarToast('Erro no GPS.');
    } finally {
      this.carregandoLocalizacao = false;
    }
  }

  async enviarDenuncia() {
    if (this.denunciaForm.invalid || !this.fotoFoco || !this.coordenadas) {
      this.mostrarToast('Preencha a morada e tire uma foto.');
      return;
    }
    this.mostrarToast('Denúncia enviada com sucesso! Protocolo: #84932', 'success');
    this.denunciaForm.reset();
    this.fotoFoco = undefined;
  }

  async mostrarToast(mensagem: string, cor: string = 'danger') {
    const toast = await this.toastController.create({
      message: mensagem, duration: 3000, color: cor, position: 'bottom'
    });
    toast.present();
  }
}