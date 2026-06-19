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
  {
    path: 'noticias',
    loadComponent: () => import('./pages/noticias/noticias.page').then( m => m.NoticiasPage)
  },
  {
    path: 'suporte',
    loadComponent: () => import('./pages/suporte/suporte.page').then( m => m.SuportePage)
  },
  {
    path: 'consultar-denuncia',
    loadComponent: () => import('./pages/consultar-denuncia/consultar-denuncia.page').then( m => m.ConsultarDenunciaPage)
  },
  {
    path: 'postos-saude',
    loadComponent: () => import('./pages/postos-saude/postos-saude.page').then( m => m.PostosSaudePage)
  },
  {
    path: 'chatbot',
    loadComponent: () => import('./pages/chatbot/chatbot.page').then( m => m.ChatbotPage)
  },
];