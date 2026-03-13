import { Component, inject, signal } from '@angular/core';
import { PrimeNGModule } from '../../shared/primeNG/prime-ng.imports';
import { NotificationService } from '../../core/services/notification.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { finalize, tap } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [PrimeNGModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private readonly notificationService = inject(NotificationService);
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);

  public isLoading = signal(false);

  public form = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  public onSubmit(): void {
    if (this.form.invalid || this.isLoading()) return;
    this.isLoading.set(true);
    const { name, lastName, username, email, password } = this.form.getRawValue();

    this.authService
      .register(name, lastName, username, email, password)
      .pipe(
        tap(() => {
          this.isLoading.set(true);
        }),
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: ({ token, refreshToken }) => {
          this.authService.saveTokens(token, refreshToken);
          this.notificationService.success('Welcome', 'Registration successful');
          this.router.navigate(['/home']);
        },
        error: () => this.isLoading.set(false),
      });
      this.isLoading.set(true);
  }
}
