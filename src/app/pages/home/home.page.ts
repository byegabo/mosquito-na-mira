import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ActionSheetController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  statsChartOutline, checkmarkCircleOutline, documentTextOutline, 
  medkitOutline, mapOutline, newspaperOutline, helpCircleOutline, 
  homeOutline, menuOutline, headsetOutline, personOutline,
  listOutline, logOutOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class HomePage {
  
  isAgenteLogado: boolean = false;

  constructor(
    private router: Router, 
    private actionSheetCtrl: ActionSheetController 
  ) {
    addIcons({ 
      statsChartOutline, checkmarkCircleOutline, documentTextOutline, 
      medkitOutline, mapOutline, newspaperOutline, helpCircleOutline, 
      homeOutline, menuOutline, headsetOutline, personOutline,
      listOutline, logOutOutline
    });
  }

  ionViewWillEnter() {
    const agente = localStorage.getItem('agenteLogado');
    this.isAgenteLogado = !!agente;
  }
  

  irParaGerenciamento() {
    this.router.navigate(['/gerenciar-casos']);
  }

  async abrirMenuPerfil() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Minha Conta',
      buttons: [
        {
          text: 'Sair do aplicativo',
          role: 'destructive',
          icon: 'log-out-outline',
          handler: () => {
            this.sairSistema();
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  sairSistema() {
    localStorage.removeItem('agenteLogado');
    this.isAgenteLogado = false;
    this.router.navigate(['/login']);
}
}