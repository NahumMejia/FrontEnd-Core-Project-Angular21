import { Component } from '@angular/core';
import { Navbar } from "./navbar/navbar";
import { Footer } from "./footer/footer";
import { PrimeNGModule } from '../../Shared/PrimeNG/prime-ng.imports';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [Navbar, Footer, PrimeNGModule, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export default class Layout {

}
