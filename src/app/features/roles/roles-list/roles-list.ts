import { Component, inject, OnInit, signal } from '@angular/core';
import { RoleService } from '../service/role.service';
import { PrimeNGModule } from '../../../shared/primeNG/prime-ng.imports';
import { Role } from '../interfaces/role.interface';
import { Loader } from "../../../core/components/loader/loader";

@Component({
  selector: 'app-roles-list',
  imports: [PrimeNGModule, Loader],
  templateUrl: './roles-list.html',
  styleUrl: './roles-list.scss',
})
export default class RolesList implements OnInit {
  private readonly roleService = inject(RoleService);

  public roles = signal<Role[]>([]);
  public totalRecords = signal(0);
  public isLoading = signal(false);

  ngOnInit() {
    this.loadRoles();
  }

  public loadRoles(page = 0, size = 10) {
    this.isLoading.set(true);
    this.roleService.getRoles(page, size).subscribe({
      next: (response) => {
        this.roles.set(response.content);
        this.totalRecords.set(response.totalElements);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}
