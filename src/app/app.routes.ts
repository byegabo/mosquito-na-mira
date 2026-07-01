import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
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
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'cadastro-cidadao',
    loadComponent: () => import('./pages/cadastro-cidadao/cadastro-cidadao.page').then( m => m.CadastroCidadaoPage)
  },
  {
    path: 'cadastro-agente',
    loadComponent: () => import('./pages/cadastro-agente/cadastro-agente.page').then( m => m.CadastroAgentePage)
  },
  {
    path: 'gerenciar-casos',
    loadComponent: () => import('./pages/gerenciar-casos/gerenciar-casos.page').then( m => m.GerenciarCasosPage)
  },
  {
    path: 'cadastro-agente',
    loadComponent: () => import('./pages/cadastro-agente/cadastro-agente.page').then( m => m.CadastroAgentePage)
  }
];