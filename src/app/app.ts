import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGModule } from "./shared/primeNG/prime-ng.imports";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PrimeNGModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('core-project');
}
