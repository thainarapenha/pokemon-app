import { Routes } from '@angular/router';
import { TabBarComponent } from './components/tab-bar/tab-bar.component';

export const routes: Routes = [
  {
    path: 'tab-bar',
    component: TabBarComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'pokemon/:name',
        loadComponent: () => import('./pages/pokemon-detail/pokemon-detail.page').then((m) => m.PokemonDetailPage),
      },
      {
        path: 'favorites',
        loadComponent: () => import('./pages/favorites/favorites.page').then((m) => m.FavoritesPage),
      },
      {
        path: '',
        redirectTo: '/tab-bar/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tab-bar/home',
    pathMatch: 'full',
  },
];
