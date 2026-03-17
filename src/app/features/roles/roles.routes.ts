import { Routes } from '@angular/router';
import RolesList from './roles-list/roles-list';
import RolesCreate from './roles-create/roles-create';

export const ROLES_ROUTES: Routes = [
  {
    path: 'list',
    component: RolesList
  },
  {
    path: 'create',
    component: RolesCreate
  },
];
