import { Component, inject } from '@angular/core';
import { NavAdminComponent } from "../nav-admin/nav-admin.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventosService } from '../../Services/eventos.service';
import { EventosSend } from '../../Interfaces/EventoSend';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-home-admin',
  imports: [NavAdminComponent,ReactiveFormsModule],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent {


  tipoEvento = [
  { key: 'OBRA_TEATRO', label: 'Obra de teatro' },
  { key: 'CONCIERTO', label: 'Concierto' },
  { key: 'CONFERENCIA', label: 'Conferencia' }
  ];

  serviceEventos= inject(EventosService);
  fb = inject(FormBuilder);

  formulario = this.fb.nonNullable.group({
    nombre:["",Validators.required],
     fechaHora: [new Date().toISOString(), Validators.required],
    capacidadTotal:[0,Validators.required],
    capacidadDisponible:[0,Validators.required],
    tipoEvento:["",Validators.required],

  })

  evento: EventosSend = {
    
    nombre: "",
    fechaHora : new Date().toISOString(),
    capacidadTotal:0,
    capacidadDisponible:0,
    tipoEvento:""
  }

  subirEvento()
  {
  this.evento.nombre = this.formulario.value.nombre ?? "";
  this.evento.fechaHora = new Date(this.formulario.value.fechaHora ?? new Date()).toISOString();
  this.evento.capacidadTotal = Number(this.formulario.value.capacidadTotal ?? 0);
  this.evento.capacidadDisponible = Number(this.formulario.value.capacidadDisponible ?? 0);
  this.evento.tipoEvento = this.formulario.value.tipoEvento ?? "";

   console.log("Evento a enviar:", this.evento);

      this.serviceEventos.CrearEvento(this.evento).subscribe({
        next:()=>{
         this.eventoCreado()
          window.location.reload();
        },
        error:(err:Error)=>
        {
          console.log(err.message);
          this.eventoFallido();
        }
      })
  }

   eventoCreado()
      {
      Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Evento creado con exito",
    showConfirmButton: false,
    timer: 1500
        });
      }

        eventoFallido()
      {
      Swal.fire({
    position: "top-end",
    icon: "error",
    title: "El evento no se pudo crear, intente nuevamente",
    showConfirmButton: false,
    timer: 1500
        });
      }
}
