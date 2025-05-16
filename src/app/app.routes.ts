import { Routes } from '@angular/router';
import { EventosComponent } from './ComponentesPrincipales/eventos/eventos.component';
import { FormReservaComponent } from './ComponentesPrincipales/form-reserva/form-reserva.component';
import { HistorialUserComponent } from './ComponentesPrincipales/historial-user/historial-user.component';
import { PaginaPrincipalComponent } from './ComponentesPrincipales/pagina-principal/pagina-principal.component';
import { LoginComponent } from './ComponentesAdmin/login/login.component';

import { authGuardFn } from './ComponentesAdmin/Guard/Auth-guard-fn';
import { HomeAdminComponent } from './ComponentesAdmin/home-admin/home-admin.component';


export const routes: Routes = [

    {
        path:"Home", component:EventosComponent
    },
    {
        path:"paginaPrincipal", component:PaginaPrincipalComponent
    },


    {
        path:"", redirectTo:"paginaPrincipal", pathMatch:'full'
    },

     {
        path:"reservas/:id", component:FormReservaComponent
    },

    {
        path:"misReservas", component:HistorialUserComponent
    },

    {
        path:"login", component:LoginComponent
    }

    ,

     {
        path:"HomeAdmin", component:HomeAdminComponent,
        canActivate:[authGuardFn]
    }
];
