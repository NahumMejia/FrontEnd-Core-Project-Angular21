import { Component, inject, OnInit, signal } from '@angular/core';
import { RoleService } from '../service/role.service';
import { PrimeNGModule } from '../../../shared/primeNG/prime-ng.imports';
import { Role } from '../interfaces/role.interface';
import { Loader } from "../../../core/components/loader/loader";
import { RouterLink } from "@angular/router";
import { NotificationService } from '../../../core/services/notification.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-roles-list',
  imports: [PrimeNGModule, Loader, RouterLink],
  templateUrl: './roles-list.html',
  styleUrl: './roles-list.scss',
})
export default class RolesList implements OnInit {
  private readonly roleService = inject(RoleService);
  private readonly notificationService = inject(NotificationService);
  private readonly confirmationService: ConfirmationService = inject(ConfirmationService);

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

  public deleteRole(role: Role): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete <b>"${role.name}"</b>?`,
      header: 'Delete Role',
      icon: 'pi pi-trash',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: (): void => {
        this.roleService.deleteRole(role.id).subscribe({
          next: (): void => {
            this.notificationService.success(
              'Role deleted',
              `"${role.name}" was deleted successfully`,
            );
            this.loadRoles();
          },
          error: (): void => {
            this.notificationService.error('Error', `Failed to delete "${role.name}"`);
          },
        });
      },
    });
  }
}
