import { Component, inject, OnInit } from '@angular/core';
import { Eventos } from '../../Interfaces/Eventos';
import { EventosService } from '../../Services/eventos.service';
import { NavComponent } from "../nav/nav.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartaComponent } from "../carta/carta.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-eventos',
  imports: [NavComponent, CommonModule, CartaComponent, FooterComponent],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent implements OnInit{


  ngOnInit(): void {
    this.traerEventos();
  }


  servicioEventos = inject(EventosService);
  listaEventos: Eventos[]= [];

  traerEventos()
  {
    this.servicioEventos.getEventos().subscribe({
      next:(lista)=>
      {
        this.listaEventos = lista;
      },
      error:(err:Error)=>
      {
        console.log(err.message);
      }
    })
  }
  

}
