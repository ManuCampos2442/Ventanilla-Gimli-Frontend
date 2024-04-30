import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDTO } from '../model/login-dto';
import { MensajeDTO } from '../model/mensaje-dto';
import { RegistroClienteDTO } from '../model/RegistroClienteDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 

  private authURL = "http://localhost:8080/api/auth";
  constructor(private http: HttpClient) { }

  public registrarCliente(cliente: RegistroClienteDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/registrar-cliente`, cliente);
  } 

  public login(loginDTO: LoginDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/login`, loginDTO);
  }
}
