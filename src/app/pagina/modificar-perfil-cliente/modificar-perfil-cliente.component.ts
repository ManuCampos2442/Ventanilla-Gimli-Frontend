import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DetalleDatosClienteDTO } from 'src/app/model/DetalleDatosClienteDTO';
import { ModificarClienteDTO } from 'src/app/model/ModificarClienteDTO';
import { Alerta } from 'src/app/model/alerta';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-modificar-perfil-cliente',
  templateUrl: './modificar-perfil-cliente.component.html',
  styleUrls: ['./modificar-perfil-cliente.component.css']
})
export class ModificarPerfilClienteComponent {


  modificarClienteDTO: ModificarClienteDTO;
  alerta!: Alerta;

  detalleCliente: DetalleDatosClienteDTO;

  constructor(private tokenService: TokenService,
    private clienteService: ClienteService, private router: Router) {

    this.modificarClienteDTO = new ModificarClienteDTO();

    this.detalleCliente = new DetalleDatosClienteDTO();

    this.verDetalleDatosCliente();
  }

  public sonIguales(): boolean {
    return this.modificarClienteDTO.password == this.modificarClienteDTO.confirmaPassword;
  }

  public modificarPerfilCliente() {

    this.modificarClienteDTO.codigoCliente = this.tokenService.getCodigo();

    this.clienteService.editarPerfil(this.modificarClienteDTO).subscribe({
      next: data => {
        alert("Edicion de perfil exitoso")
        this.tokenService.getNombre();
        window.location.reload();
      },
      error: error => {
        console.log(error);
      }
    });

  }


  camposVacios(): boolean {
    return !this.modificarClienteDTO.nombre || !this.modificarClienteDTO.telefono || !this.modificarClienteDTO.direccion || !this.modificarClienteDTO.correo || !this.modificarClienteDTO.password || !this.modificarClienteDTO.confirmaPassword;
  }


  public eliminarCuenta() {
    const confirmacion = confirm('¿Estás seguro de que quieres eliminar tu cuenta?');

    if (confirmacion) {
      let codigo = this.tokenService.getCodigo();

      this.clienteService.eliminarCuenta(codigo).subscribe({
        next: data => {
          alert('Cuenta eliminada con éxito');
          this.tokenService.logout();
        },
        error: error => {
          console.log(error);
        }
      });
    } else {
      // El usuario ha cancelado la operación
      console.log('Operación de eliminación de cuenta cancelada');
    }
  }


  public verDetalleDatosCliente() {

    this.clienteService.verDetalleDatosCliente(this.tokenService.getCodigo()).subscribe({
      next: data => {
        console.log(data.respuesta);
        this.detalleCliente = data.respuesta;
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
        console.log(error);
      }
    })


  }

}
