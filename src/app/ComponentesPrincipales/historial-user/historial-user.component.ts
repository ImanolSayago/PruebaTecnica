import { Component, inject, input } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { Eventos } from '../../Interfaces/Eventos';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventosService } from '../../Services/eventos.service';
import { ReservaService } from '../../Services/reserva.service';

import { CartaComponent } from "../carta/carta.component";
import { FooterComponent } from "../footer/footer.component";
import { Reservas } from '../../Interfaces/Reservas';

@Component({
  selector: 'app-historial-user',
  imports: [NavComponent, ReactiveFormsModule, CartaComponent, FooterComponent],
  templateUrl: './historial-user.component.html',
  styleUrl: './historial-user.component.css'
})
export class HistorialUserComponent {

  
  listaReservas: Reservas[] = [];

  fb = inject(FormBuilder);

  cantAsistencias = 0;
  correopersona:String = "";

  servicioReserva = inject(ReservaService);

  formulario = this.fb.nonNullable.group({
    correo:["",Validators.required]
  });

  buscarEventosCorreo()
  {

    this.correopersona = this.formulario.value.correo??"";

    this.servicioReserva.getReservasByEmail(this.correopersona).subscribe({
      next:(eventos)=>{
        this.CantReservas();
        this.listaReservas=eventos;
      },
      error:(err:Error)=>{
        console.log(err.message);
      }
    })
  }
  

  CantReservas()
  {
    this.correopersona = this.formulario.value.correo??"";
    this.servicioReserva.getContadorUsuarioXEventos(this.correopersona).subscribe({
      next:(num)=>{
        this.cantAsistencias = num;
      },
      error:(err:Error)=>{
        console.log(err.message);
      }
    })
  }

 


}
