import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/dev.production';
import { HttpClient } from '@angular/common/http';
import { CreateRoleRequest, RolePage } from '../interfaces/role.interface';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private readonly BASE_URL = `${environment.api.url}`;
  private readonly http = inject(HttpClient);

  public getRoles(page = 0, size = 10, sortBy = 'name') {
    return this.http.get<RolePage>(`${this.BASE_URL}/super-admin/roles`, {
      params: { page, size, sortBy },
    });
  }

  public getPermissions() {
    return this.http.get<string[]>(`${this.BASE_URL}/super-admin/roles/permissions`);
  }

  public createRole(request: CreateRoleRequest) {
    return this.http.post<void>(`${this.BASE_URL}/super-admin/roles`, request);
  }

  public deleteRole(role_id: number) {
    return this.http.delete<void>(`${this.BASE_URL}/super-admin/roles/${role_id}`);
  }

}
