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

  @ViewChild('f', { static: false }) registroForm!: NgForm;

  registroClienteDTO: RegistroClienteDTO;

  constructor(private authService: AuthService,
    private router: Router) {

    this.registroClienteDTO = new RegistroClienteDTO();

  }

  public registrar() {

    this.authService.registrarCliente(this.registroClienteDTO).subscribe({
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


    // console.log(this.registroPacienteDTO);

    // if(this.archivos != null && this.archivos.length > 0){
    //   console.log(this.registroPacienteDTO);
    //   }else{
    //   console.log("Debe cargar una foto");
    //   } 
  }

  getMaxDate(): string {
    // Obtener la fecha actual en formato YYYY-MM-DD
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }


  public sonIguales(): boolean {
    return this.registroClienteDTO.password == this.registroClienteDTO.confirmaPassword;
  }


}


