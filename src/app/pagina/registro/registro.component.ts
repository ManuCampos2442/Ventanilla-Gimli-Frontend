import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroClienteDTO } from 'src/app/model/RegistroClienteDTO';
import { Alerta } from 'src/app/model/alerta';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  alerta!: Alerta;

  termsAccepted = false; // Añade esta línea

  @ViewChild('f', { static: false }) registroForm!: NgForm;

  registroClienteDTO: RegistroClienteDTO;

  constructor(private authService: AuthService,
    private router: Router) {

    this.registroClienteDTO = new RegistroClienteDTO();

  }



  public registrar() {

    if (this.verificarCorreo(this.registroClienteDTO.correo)) {

    } else {
      this.authService.registrarCliente(this.registroClienteDTO).subscribe({
        next: data => {
          this.alerta = { tipo: "success", mensaje: data.respuesta }
          this.registroClienteDTO = {
            nombre: "",
            telefono: "",
            direccion: "",
            correo: "",
            password: "",
            confirmaPassword: ""
          }
          console.log(data);
          // this.router.navigate(['/login']);
        },
        error: error => {
          this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
          //alert("Asegurate de llenar todos los campos primero")
          console.log(error);
        }
      });
    }
  }


  getMaxDate(): string {
    // Obtener la fecha actual en formato YYYY-MM-DD
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  public verificarCorreo(correo: string) {

    const dominioGmail = "@gmail.com";
    const dominioHotmail = "@hotmail.com";

    if (correo.endsWith(dominioGmail) ||(correo.endsWith(dominioHotmail))) {
      return false;
    } else {
      this.alerta = {mensaje: "El correo electronico debe ser @gmail.com por ejemplo", tipo: "danger"}
      return true;
    }

  }

  public sonIguales(): boolean {
    return this.registroClienteDTO.password == this.registroClienteDTO.confirmaPassword;
  }


  correoValido(correo: string): boolean {
    return !/^\d/.test(correo); // Verifica que no comience con un número
  }

  direccionValida(direccion: string): boolean {
    return !/^\d/.test(direccion); // Verifica que no comience con un número
  }

}



