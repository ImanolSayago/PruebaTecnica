import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService } from "../../Services/admin.service";

export const authGuardFn = ()=>
    {
       const  authservice = inject(AdminService);
    
       const rutas = inject(Router);
       
       if(authservice.getIsLoggedIn() || localStorage.getItem("token"))
       {
        localStorage.setItem("token","123.123.123");
            return true;
       }
       else
       {
        localStorage.removeItem("token"); // Eliminar token inválido
        rutas.navigate(["login"])
        return false;
       }
    }