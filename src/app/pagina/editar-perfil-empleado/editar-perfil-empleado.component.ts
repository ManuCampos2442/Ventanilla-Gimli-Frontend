import { Component } from '@angular/core';
import { ModificarEmpleadoDTO } from 'src/app/model/ModificarEmpleadoDTO';
import { Alerta } from 'src/app/model/alerta';

@Component({
  selector: 'app-editar-perfil-empleado',
  templateUrl: './editar-perfil-empleado.component.html',
  styleUrls: ['./editar-perfil-empleado.component.css']
})
export class EditarPerfilEmpleadoComponent {

  modificarEmpleadoDTO: ModificarEmpleadoDTO;
  alerta!: Alerta;
  
  constructor(){
    this.modificarEmpleadoDTO = new ModificarEmpleadoDTO();
  }

  public sonIguales(): boolean {
    return this.modificarEmpleadoDTO.password == this.modificarEmpleadoDTO.confirmaPassword;
  }

  camposVacios(): boolean {
    return !this.modificarEmpleadoDTO.nombre || !this.modificarEmpleadoDTO.telefono || !this.modificarEmpleadoDTO.correo || !this.modificarEmpleadoDTO.password || !this.modificarEmpleadoDTO.confirmaPassword;
  }

  public modificarPerfilEmpleado(){
    
  }


}
