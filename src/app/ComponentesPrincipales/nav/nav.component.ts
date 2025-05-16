import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  rutas = inject(Router);

  misReservas()
  {
    this.rutas.navigate(["misReservas"]);
  }

  irEventos()
  {
    this.rutas.navigate(["Home"]);
  }

  irLogin()
  {
    this.rutas.navigate(["login"]);
  }

  menuAbierto: boolean = false;

toggleMenu() {
  this.menuAbierto = !this.menuAbierto;
}
 
}
