import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/dev.production';
import { AuthTokens, JwtPayload } from '../interfaces/auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly BASE_URL = `${environment.api.url}/auth`;
  private readonly TOKEN_KEY = 'token';
  private readonly REFRESH_KEY = 'refreshToken';

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  //AUTH
  public register(name: string, lastName: string, username: string, email: string, password: string) {
    return this.http.post<AuthTokens>(`${this.BASE_URL}/register`, {
      name,
      lastName,
      username,
      email,
      password,
    });
  }

  public login(username: string, password: string) {
    return this.http.post<AuthTokens>(`${this.BASE_URL}/authenticate`, { username, password });
  }

  public refreshToken() {
    return this.http.post<AuthTokens>(`${this.BASE_URL}/refresh-token`, {
      refreshToken: this.getRefreshToken(),
    });
  }

  public logout() {
    const refreshToken = this.getRefreshToken();
    if (refreshToken) {
      this.http.post(`${this.BASE_URL}/logout`, { refreshToken }).subscribe();
    }
    this.clearTokens();
    this.router.navigate(['/login']);
  }

  //TOKEN MANIPULATION
  public saveTokens(token: string, refreshToken: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.REFRESH_KEY, refreshToken);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_KEY);
  }

  public clearTokens(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
  }

  //JWT
  public isLoggedIn(): boolean {
    const decoded = this.decodeToken();
    if (!decoded?.exp) return false;
    return decoded.exp * 1000 > Date.now();
  }

  public getPermissions(): string[] {
    const decoded = this.decodeToken();
    return decoded?.authorities ?? [];
  }

  public hasPermission(permission: string): boolean {
    return this.getPermissions().includes(permission);
  }

  public decodeToken(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode<JwtPayload>(token);
    } catch {
      return null;
    }
  }
}
