import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservas } from '../../Interfaces/Reservas';
import { ReservaService } from '../../Services/reserva.service';
import { NavComponent } from "../nav/nav.component";
import { EventosService } from '../../Services/eventos.service';
import { Eventos } from '../../Interfaces/Eventos';
import { TipoEntrada } from '../../Interfaces/tipoEntrada';
import { FooterComponent } from "../footer/footer.component";
import Swal from 'sweetalert2'
@Component({
  selector: 'app-form-reserva',
  imports: [NavComponent, ReactiveFormsModule, FooterComponent],
  templateUrl: './form-reserva.component.html',
  styleUrl: './form-reserva.component.css'
})
export class FormReservaComponent implements OnInit{

  
  
  ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    this.idEvento = Number(params.get('id'));
  
    this.traerEvento();
  });
  }

  idEvento=0;

  route = inject(ActivatedRoute);

  rutas = inject(Router);
  fb = inject(FormBuilder);

  servicioReservas = inject(ReservaService);
  servicioEventos = inject(EventosService);

  formulario = this.fb.nonNullable.group({
    nombreAsistente:["",Validators.required],
    email:["",Validators.required],
    tipoEntrada:["",Validators.required],
  })

  evento : Eventos= {
    id : 0,
    nombre:"",
    fechaHora : new Date(),
    tipoEvento:"",
    capacidadDisponible:0,
    capacidadTotal:0,
  }

  reserva : Reservas =
  {
    nombreAsistente:"",
    email:"",
    tipoEntrada:"",
    fechaReserva: new Date(),
    eventoId: this.idEvento,
    cancelada: false
  }

  tiposEntrada = Object.values(TipoEntrada);

  traerEvento()
  {
    this.servicioEventos.getEventoById(this.idEvento).subscribe({
      next:(eventoBack)=>
      {
        this.evento = eventoBack;
      },
      error:(err:Error)=>{
        console.log(err.message);
      }
    })
  }

  hacerReserva()
  {
    this.reserva.nombreAsistente = this.formulario.value.nombreAsistente??"";
    this.reserva.email = this.formulario.value.email??"";
    this.reserva.tipoEntrada = this.formulario.value.tipoEntrada??"";
    this.reserva.fechaReserva = new Date();
    this.reserva.cancelada = false;
    this.reserva.eventoId = this.idEvento

    if(this.evento.capacidadDisponible>1)
    {
      this.servicioReservas.CrearReserva(this.reserva).subscribe({
      next:()=>
      {
        this.ReservaExitosa();
        this.rutas.navigate(["misReservas"])
      },
      error:()=>{
        alert("La reserva no se pudo generar, intente nuevamente");
        window.location.reload();
      }
    })
    }
    
  }
  
      ReservaExitosa()
      {
      Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Login correcto",
    showConfirmButton: false,
    timer: 1500
        });
      }

    ReservaFallida()
    {
    Swal.fire({
  position: "top-end",
  icon: "error",
  title: "Login correcto",
  showConfirmButton: false,
  timer: 1500
      });
    }

}
