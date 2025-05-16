import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Eventos } from '../Interfaces/Eventos';
import { EventosSend } from '../Interfaces/EventoSend';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private api = "/api";

  http= inject(HttpClient);


  getEventos():Observable<any[]>
  {
    const url = `${this.api}/eventos`;
    return this.http.get<any[]>(url);
  }

  getEventoById(id:number):Observable<Eventos>
  {
    const url = `${this.api}/eventos/${id}`;

    return this.http.get<Eventos>(url);
  }

  CrearEvento(evento : EventosSend):Observable<any>
  {
    const url = `${this.api}/eventos`;
    return this.http.post<EventosSend>(url,evento);
  }

}
