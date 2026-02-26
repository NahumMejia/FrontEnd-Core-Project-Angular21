import { Component } from '@angular/core';

interface FooterItem {
  name: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  public currentYear = new Date().getFullYear();

  public footerItems: FooterItem[] = [
    { name: 'Instagram', icon: 'pi-instagram', url: 'https://instagram.com' },
    { name: 'Facebook', icon: 'pi-facebook', url: 'https://facebook.com' },
    { name: 'Twitter', icon: 'pi-twitter', url: 'https://twitter.com' },
    { name: 'Github', icon: 'pi-github', url: 'https://github.com' },
  ];
}
