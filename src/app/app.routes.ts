import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'pokemon/:name',
    loadComponent: () => import('./pages/pokemon-detail/pokemon-detail.page').then((m) => m.PokemonDetailPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
