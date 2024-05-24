import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleRegistroProductoDTO } from 'src/app/model/DetalleRegistroProductoDTO';
import { Alerta } from 'src/app/model/alerta';
import { AdministradorService } from 'src/app/servicios/administrador.service';
import { EmpleadoService } from 'src/app/servicios/empleado.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-detalle-registro-producto',
  templateUrl: './detalle-registro-producto.component.html',
  styleUrls: ['./detalle-registro-producto.component.css']
})
export class DetalleRegistroProductoComponent {

  detalleProductoDTO: DetalleRegistroProductoDTO | undefined;
  codigoRegistro = 0;

  alerta!: Alerta;

  constructor(private empleadoService: EmpleadoService, private route: ActivatedRoute,
    private adminService: AdministradorService,
    private tokenService: TokenService
  ){

    this.route.params.subscribe(params => {
    this.codigoRegistro = params['codigoRegistro']
    })
    
    let  registroConsultado = this.verDetalleRegistroProducto();

    if(registroConsultado != undefined){
      this.detalleProductoDTO = registroConsultado;
    }
  
  }

  public verDetalleRegistroProducto(){

    if(this.tokenService.getRole() == 'empleado'){

      this.empleadoService.verDetalleRegistro(this.codigoRegistro).subscribe({
        next: data => {
          this.detalleProductoDTO = data.respuesta;
        },
        error: error => {
          this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
          console.log(error);
        }
      });
    }else if(this.tokenService.getRole() == 'admin'){

      this.adminService.verDetalleRegistro(this.codigoRegistro).subscribe({
        next: data => {
          this.detalleProductoDTO = data.respuesta;
        },
        error: error => {
          this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
          console.log(error);
        }
      });
    }

  }

}
