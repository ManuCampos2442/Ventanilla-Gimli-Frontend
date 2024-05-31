import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroClienteDTO } from 'src/app/model/RegistroClienteDTO';
import { Alerta } from 'src/app/model/alerta';
import { RegistroEmpleadoDTO } from 'src/app/model/registro-empleado-dto';
import { AdministradorService } from 'src/app/servicios/administrador.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-registro-empleado',
  templateUrl: './registro-empleado.component.html',
  styleUrls: ['./registro-empleado.component.css']
})
export class RegistroEmpleadoComponent {

  registroEmpleadoDTO: RegistroEmpleadoDTO;

  alerta!: Alerta;

  @ViewChild('f', { static: false }) registroForm!: NgForm;

  constructor(private authService: AuthService,
    private router: Router, private administradorService: AdministradorService) {

    this.registroEmpleadoDTO = new RegistroEmpleadoDTO();
  }

  public sonIguales(): boolean {
    return this.registroEmpleadoDTO.password == this.registroEmpleadoDTO.confirmaPassword;
  }

  public registrar() {

    if(this.verificarCorreo(this.registroEmpleadoDTO.correo)){
    }else{
      this.administradorService.registrarEmpleado(this.registroEmpleadoDTO).subscribe({
        next: data => {
          this.alerta = { tipo: "success", mensaje: data.respuesta }
          this.registroForm.reset();
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

  camposVacios(): boolean {
    return !this.registroEmpleadoDTO.cedula ||
      !this.registroEmpleadoDTO.correo ||
      !this.registroEmpleadoDTO.nombre ||
      !this.registroEmpleadoDTO.telefono ||
      !this.registroEmpleadoDTO.password ||
      !this.registroEmpleadoDTO.confirmaPassword ||
      !this.sonIguales() ||
      !this.registroForm.valid;
      !this.correoValido(this.registroEmpleadoDTO.correo);
  }


  correoValido(correo: string): boolean {
    return !/^\d/.test(correo); // Verifica que no comience con un número
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

}