import { Component, inject, OnInit } from '@angular/core';
import { NavAdminComponent } from "../nav-admin/nav-admin.component";
import { Eventos } from '../../Interfaces/Eventos';
import { EventosService } from '../../Services/eventos.service';
import { CartaComponent } from "../../ComponentesPrincipales/carta/carta.component";

@Component({
  selector: 'app-principal',
  imports: [NavAdminComponent, CartaComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit {

  ngOnInit(): void {
    this.traerEventos();
  }

  listaEventos:  Eventos[] = []

  serviceEventos = inject(EventosService);

  traerEventos()
  {
    this.serviceEventos.getEventos().subscribe({
      next:(lista)=>{
          this.listaEventos = lista;
      },
      error:(err:Error)=>{
        console.log(err.message);
        } 
    })
  }

}
