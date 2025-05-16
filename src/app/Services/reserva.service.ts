import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservas } from '../Interfaces/Reservas';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
 api = "/api";


  http = inject(HttpClient);

  getReservasByEmail(email: String):Observable<[]>
  {
    const url = `${this.api}/reservas/usuario/${email}`;
    return this.http.get<[]>(url);
  }

  getContadorUsuarioXEventos(email: String):Observable<number>
  {
    const url = `${this.api}/reservas/usuario/${email}/contador`;
    return this.http.get<number>(url);
  }

  CrearReserva(reserva: Reservas):Observable<Reservas>
  {
    const url = `${this.api}/reservas`;
    return this.http.post<Reservas>(url,reserva);
  }

  CancelarReserva(id: number):Observable<any>
  {
    const url = `${this.api}/reservas/${id}/cancelar`;
    return this.http.post<any>(url,id);
  }
}
