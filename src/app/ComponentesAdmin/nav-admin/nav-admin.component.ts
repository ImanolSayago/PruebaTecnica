import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-nav-admin',
  imports: [],
  templateUrl: './nav-admin.component.html',
  styleUrl: './nav-admin.component.css'
})
export class NavAdminComponent {

  rutas = inject(Router);
  servicioAdmin = inject(AdminService);
  menuAbierto: boolean = false;

toggleMenu() {
  this.menuAbierto = !this.menuAbierto;
}

logout()
{
  this.servicioAdmin.logOut();
   this.rutas.navigate(['login']);
}

irCreacion()
{
  this.rutas.navigate(["HomeAdmin"])
}

irInicioAdmin()
{
  this.rutas.navigate(["principal"])
}

 
}
