import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [ToolbarModule, MenubarModule, MenuModule, AvatarModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  private readonly authService = inject(AuthService);

  public items: MenuItem[] | undefined;
  public userMenuItems: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      { label: 'Home', icon: 'pi pi-home', routerLink: '/home' },
      { label: 'Features', icon: 'pi pi-star' },
      {
        label: 'Projects',
        icon: 'pi pi-search',
        items: [
          { label: 'Components', icon: 'pi pi-bolt' },
          { label: 'UI Kit', icon: 'pi pi-pencil' },
        ],
      },
    ];

    this.userMenuItems = [
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-sign-out',
        command: () => {
          this.authService.logout();
        },
      },
    ];
  }
}
