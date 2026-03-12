import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from '../../shared/primeNG/prime-ng.imports';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-login',
  imports: [PrimeNGModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  //Injections
  private readonly formBuilder = inject(FormBuilder);
  private readonly notificationService = inject(NotificationService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  public form = this.formBuilder.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  public onSubmit(): void {
    if (this.form.invalid) return;
    const { username, password } = this.form.getRawValue();

    this.authService.login(username, password).subscribe({
      next: ({ token, refreshToken }) => {
        this.authService.saveTokens(token, refreshToken);
        this.notificationService.success('Bienvenido', 'Sesión iniciada correctamente');
        this.router.navigate(['/home']);
      },
      error: () => {
        this.notificationService.error('Error', 'Username or password are wrong');
      },
    });
  }
}
