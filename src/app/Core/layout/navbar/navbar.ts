import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-navbar',
  imports: [ToolbarModule, MenubarModule, MenuModule, AvatarModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);

  public items: MenuItem[] | undefined;
  public userMenuItems: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      { label: 'Home', icon: 'pi pi-home', routerLink: '/home' },
      {
        label: 'Admin',
        icon: 'pi pi-cog',
        items: [
          { label: 'Roles', icon: 'pi pi-sitemap', routerLink: '/roles/list' },
        ],
      },
    ];

    this.userMenuItems = [
      {
        label: 'Log Out',
        icon: 'pi pi-sign-out',
        command: () => {
          this.authService.logout();
          this.notificationService.success('Logged out successfully', 'See you soon');
        },
      },
    ];
  }
}
