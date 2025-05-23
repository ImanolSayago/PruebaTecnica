import { Component, inject, Inject } from '@angular/core';
import { NavComponent } from "../../ComponentesPrincipales/nav/nav.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../Services/admin.service';
import { Admin } from '../../Interfaces/Admin';
import { subscribeOn } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  imports: [NavComponent,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  fb = inject(FormBuilder);


  rutas = inject(Router);
  servicioAdmin = inject(AdminService);

  admin:Admin={
    usuario:"",
    contrasena:""
  }

  formulario = this.fb.nonNullable.group({
    usuario:["",Validators.required],
    contrasena:["",Validators.required]
  })


login() {
  this.admin.contrasena = this.formulario.value.contrasena ?? "";
  this.admin.usuario     = this.formulario.value.usuario     ?? "";

  this.servicioAdmin.logIn(this.admin).subscribe({
    next: (exito) => {              // ⬅️ recibo true / false
      if (exito) {
        this.loginExitoso();         // muestra SweetAlert
        this.rutas.navigate(["principal"]);
      } else {

        this.credencialesIncorrectas();
      }
    },
    error: (err: Error) => {
     this.errorConexion()
      console.error(err.message);
    }
  });
}


    loginExitoso()
    {
    Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Login correcto",
  showConfirmButton: false,
  timer: 1500
      });
    }

    credencialesIncorrectas()
    {
        Swal.fire({
  position: "top-end",
  icon: "error",
  title: "Credenciales incorrectas",
  showConfirmButton: false,
  timer: 1500
      });
    }

    errorConexion()
    {
            Swal.fire({
  position: "top-end",
  icon: "error",
  title: "Error de conexion",
  showConfirmButton: false,
  timer: 1500
      });
    }
  
}
