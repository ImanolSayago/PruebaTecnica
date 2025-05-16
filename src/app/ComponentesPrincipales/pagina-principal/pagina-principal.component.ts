import { Component, inject } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { FooterComponent } from "../footer/footer.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-principal',
  imports: [NavComponent, FooterComponent],
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css'
})
export class PaginaPrincipalComponent {

  rutas = inject(Router);

  irEventos()
  {
    this.rutas.navigate(["Home"])
  }
}
