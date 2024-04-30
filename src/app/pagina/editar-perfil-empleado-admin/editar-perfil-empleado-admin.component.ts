import { Component } from '@angular/core';
import { ModificarEmpleadoAdminDTO } from 'src/app/model/ModificarEmpleadoAdminDTO';
import { ModificarEmpleadoDTO } from 'src/app/model/ModificarEmpleadoDTO';
import { Alerta } from 'src/app/model/alerta';
import { AdministradorService } from 'src/app/servicios/administrador.service';

@Component({
  selector: 'app-editar-perfil-empleado-admin',
  templateUrl: './editar-perfil-empleado-admin.component.html',
  styleUrls: ['./editar-perfil-empleado-admin.component.css']
})
export class EditarPerfilEmpleadoAdminComponent {

  modificarEmpleadoDTO: ModificarEmpleadoAdminDTO;
  alerta!: Alerta;
  listaCedulas: string[]
  alcoholSeleccionado: string = '';

  constructor(private adminService: AdministradorService) {
    this.listaCedulas = []
    this.modificarEmpleadoDTO = new ModificarEmpleadoAdminDTO();

    this.obtenerCedulas();
  }

  public obtenerCedulas() {
    this.adminService.listarCedulas().subscribe({
      next: data => {
        console.log(this.listaCedulas);
        this.listaCedulas = data.respuesta;


      },
      error: error => {
        console.log(error);
      }
    });
  }

  public sonIguales(): boolean {
    return this.modificarEmpleadoDTO.password == this.modificarEmpleadoDTO.confirmaPassword;
  }

  camposVacios(): boolean {
    return !this.modificarEmpleadoDTO.nombre || !this.modificarEmpleadoDTO.telefono || !this.modificarEmpleadoDTO.correo || !this.modificarEmpleadoDTO.password || !this.modificarEmpleadoDTO.confirmaPassword;
  }

  public modificarPerfilEmpleado() {

    



    this.adminService.editarPerfilEmpleado(this.modificarEmpleadoDTO).subscribe({
      next: data => {
        this.alerta = { tipo: "success", mensaje: "Perfil modificado exitorsamente" }
        window.location.reload();
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
        console.log(error);
      }
    });
  }

  public eliminarCuenta() {
    const confirmacion = confirm('¿Estás seguro de que quieres eliminar la cuenta?');

    if (confirmacion) {
      let codigo = this.modificarEmpleadoDTO.cedulaPrevia;

      this.adminService.eliminarCuentaEmpleado(codigo).subscribe({
        next: data => {
          alert('Cuenta eliminada con éxito');
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

}
