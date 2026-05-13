import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'denunciar',
    loadComponent: () => import('./pages/denunciar/denunciar.page').then((m) => m.DenunciarPage),
  },
  {
    path: 'mapa',
    loadComponent: () => import('./pages/mapa/mapa.page').then((m) => m.MapaPage),
  },
];