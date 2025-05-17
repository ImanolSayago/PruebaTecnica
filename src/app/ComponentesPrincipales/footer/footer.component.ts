import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  rutas = inject(Router);

  irEventos()
  {
    this.rutas.navigate(["Home"])
  }

  irReservas()
  {
    this.rutas.navigate(["misReservas"])
  }
}
