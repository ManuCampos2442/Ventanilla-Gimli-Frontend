import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Alerta } from 'src/app/model/alerta';
import { LoginDTO } from 'src/app/model/login-dto';
//import { Alerta } from 'src/app/modelo/alerta';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';
import { VentanillaService } from 'src/app/servicios/ventanilla.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginDTO: LoginDTO;
  alerta!: Alerta;
  correo: string = '';

  constructor(private authService: AuthService, private tokenService: TokenService,
    private ventanillaService: VentanillaService, private router: Router) {

    this.loginDTO = new LoginDTO();
  }


  public login() {

    this.authService.login(this.loginDTO).subscribe({
      next: (data: { respuesta: { token: any; }; }) => {
        
        this.tokenService.login(data.respuesta.token);
      },
      error: (error: { error: { respuesta: any; }; }) => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }
/* 
  public enviarLinkRecuperacion(){
    console.log('Correo electrónico ingresado:', this.correo);

    this.ventanillaService.enviarLinkRecuperacion(this.correo).subscribe({
      next: data => {
        alert("Correo enviado con exito")
        console.log(data);
        this.router.navigate(['/']);
      },
      error: error => {
        alert("Asegurese de ingresar un correo valido")
        console.log(error);
      }
    });

  } */
}
