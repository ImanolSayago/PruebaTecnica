import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Admin } from '../Interfaces/Admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

 apiURL= 'http://localhost:3000/admin';
  private isLogin = false;

  private http = inject(HttpClient);

  logIn(credentials: Admin): Observable<boolean> {
    
    return this.http.get<Admin[]>(this.apiURL).pipe(
      map(usuarios => {
        const usuarioEncontrado = usuarios.find(user =>
          user.usuario === credentials.usuario &&
          user.contrasena === credentials.contrasena
        );
        return !!usuarioEncontrado;
      }),
      tap(isAuthenticated => {
        this.isLogin = isAuthenticated;
        if (isAuthenticated) {
          localStorage.setItem('logueado', 'true');
        }
      })
    );
  }

  logOut() {
    this.isLogin = false;
    localStorage.removeItem('logueado');
  }

  getIsLoggedIn(): boolean {
    return this.isLogin || localStorage.getItem('logueado') === 'true';
  }
}
