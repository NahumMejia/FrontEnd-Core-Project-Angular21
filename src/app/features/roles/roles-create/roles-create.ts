import { Component, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PrimeNGModule } from '../../../shared/primeNG/prime-ng.imports';
import { Loader } from '../../../core/components/loader/loader';
import { RoleService } from '../service/role.service';
import { PermissionLabelPipe } from '../../../shared/pipes/permission-label.pipe';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-roles-create',
  imports: [PrimeNGModule, Loader, ReactiveFormsModule, PermissionLabelPipe],
  templateUrl: './roles-create.html',
  styleUrl: './roles-create.scss',
})
export default class RolesCreate implements OnInit {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly roleService: RoleService = inject(RoleService);
  private readonly router: Router = inject(Router);
  private readonly notificationService: NotificationService = inject(NotificationService);

  public isLoading = signal<boolean>(false);
  public loadingPermissions = signal<boolean>(false);
  public permissions = signal<string[]>([]);

  public form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    permissions: this.formBuilder.array([], Validators.required),
  });

  public get permissionsArray(): FormArray {
    return this.form.get('permissions') as FormArray;
  }

  public getUserPermissions(): string[] {
    return this.permissions().filter((p: string) => p.startsWith('user'));
  }

  public getAdminPermissions(): string[] {
    return this.permissions().filter((p: string) => p.startsWith('admin'));
  }

  public getSuperAdminPermissions(): string[] {
    return this.permissions().filter((p: string) => p.startsWith('super'));
  }

  public ngOnInit(): void {
    this.loadingPermissions.set(true);
    this.roleService.getPermissions().subscribe({
      next: (permissions: string[]): void => {
        this.permissions.set(permissions);
        this.loadingPermissions.set(false);
      },
    });
  }

  public isSelected(permission: string): boolean {
    return this.permissionsArray.value.includes(permission);
  }

  public togglePermission(permission: string): void {
    const index: number = this.permissionsArray.value.indexOf(permission);
    if (index === -1) {
      this.permissionsArray.push(this.formBuilder.control(permission));
    } else {
      this.permissionsArray.removeAt(index);
    }
  }

  public onSubmit(): void {
    if (this.form.get('name')?.invalid) {
      this.notificationService.warn('Missing info', 'Role name is required (min 3 characters)');
      this.form.markAllAsTouched();
      return;
    }

    if (this.permissionsArray.length === 0) {
      this.notificationService.warn('Missing info', 'Select at least one permission');
      this.permissionsArray.markAsTouched();
      return;
    }

    this.isLoading.set(true);

    const name: string = this.form.getRawValue().name;
    const permissions: string[] = (this.permissionsArray.value as string[]).map((p: string) =>
      p.toUpperCase().replace(/:/g, '_'),
    );

    this.roleService.createRole({ name, permissions }).subscribe({
      next: (): void => {
        this.notificationService.success('Role created', `Role "${name}" was created successfully`);
        this.isLoading.set(false);
        this.router.navigate(['/roles/list']);
      },
    });
  }
}
