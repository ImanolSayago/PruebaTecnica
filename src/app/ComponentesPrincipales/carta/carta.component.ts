import { Component, inject, input, OnInit } from '@angular/core';
import { Eventos } from '../../Interfaces/Eventos';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventosService } from '../../Services/eventos.service';
import { ReservaService } from '../../Services/reserva.service';

@Component({
  selector: 'app-carta',
  imports: [CommonModule,RouterLink],
  templateUrl: './carta.component.html',
  styleUrl: './carta.component.css'
})
export class CartaComponent implements OnInit {
  ngOnInit(): void {
   this.traerEventos()
  }

  evento = input<number>();
  boton = input<boolean>()

  evento1:Eventos ={
    id:0,
    nombre:"",
    fechaHora: new Date(),
    capacidadDisponible:0,
    capacidadTotal:0,
    tipoEvento:""
}
  servicioEventos = inject(EventosService);
  servicioReservas= inject(ReservaService);

  traerEventos()
  {
    this.servicioEventos.getEventoById(this.evento()??0).subscribe({
      next:(eventor)=>{
        this.evento1= eventor;
      }
    })
  }

  cancelarReserva()
  {
    this.servicioReservas.CancelarReserva(this.evento()??0).subscribe({
      next:()=>{
        alert("Reserva cancelada con exito");
       
      },
      error:(err:Error)=>{
        console.log(err.message);
        alert("No se pudo cancelar la reserva")
      }
    })
  }
}
