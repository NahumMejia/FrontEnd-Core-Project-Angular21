import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  public items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      { label: 'Home', icon: 'pi pi-home' },
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
  }
}
