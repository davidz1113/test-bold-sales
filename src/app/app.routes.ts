import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home-sales',
    pathMatch: 'full',
  },
  {
    path: 'home-sales',
    loadComponent: () => import('./pages/home-sales/home-sales.component'),
  },
];
