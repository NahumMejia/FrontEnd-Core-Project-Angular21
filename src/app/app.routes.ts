import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { Register } from './public/register/register';
import { Login } from './public/login/login';

export const routes: Routes = [
  // PUBLIC
  {
    path: 'login',
    canActivate: [guestGuard],
    component: Login,
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    component: Register,
  },

  // PROTECTED
  {
    path: '',
    loadComponent: () => import('./core/layout/layout'),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () => import('./features/home/home'),
      },
    ],
  },

  // FALLBACK
  { path: '**', redirectTo: 'login' },
];
