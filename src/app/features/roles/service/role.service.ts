import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/dev.production';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RolePage } from '../interfaces/role.interface';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private readonly BASE_URL = `${environment.api.url}`;
  private readonly http = inject(HttpClient);

  getRoles(page = 0, size = 10, sortBy = 'name') {
    return this.http.get<RolePage>(`${this.BASE_URL}/super-admin/roles`, {
      params: { page, size, sortBy },
    });
  }
}
