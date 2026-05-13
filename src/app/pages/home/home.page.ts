import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  barChartOutline, 
  warningOutline, 
  searchOutline, 
  medkitOutline, 
  mapOutline, 
  newspaperOutline, 
  helpCircleOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class HomePage {
  constructor() {
    addIcons({
      barChartOutline,
      warningOutline,
      searchOutline,
      medkitOutline,
      mapOutline,
      newspaperOutline,
      helpCircleOutline
    });
  }
}