import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { Register } from './public/register/register';
import { Login } from './public/login/login';
import Home from './features/home/home';
import { permissionGuard } from './core/guards/permission.guard';
import { ROLES_ROUTES } from './features/roles/roles.routes';

export const routes: Routes = [
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
  //--Protected Routes--
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
        component: Home,
      },
      {
        path: 'roles',
        canActivate: [permissionGuard],
        data: {permission: 'super_admin:read'},
        children: ROLES_ROUTES,
      }
    ],
  },

  // --Fallback--
  { path: '**', redirectTo: 'login' },
];
