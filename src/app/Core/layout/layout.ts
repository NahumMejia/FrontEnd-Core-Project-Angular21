import { Component } from '@angular/core';
import { PrimeNGModule } from '../../shared/primeNG/prime-ng.imports';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-layout',
  imports: [Navbar, PrimeNGModule, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export default class Layout {

}
