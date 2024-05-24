import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleVentaEmpleadoDTO } from 'src/app/model/DetalleVentaEmpleadoDTO';
import { Alerta } from 'src/app/model/alerta';
import { AdministradorService } from 'src/app/servicios/administrador.service';
import { EmpleadoService } from 'src/app/servicios/empleado.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-detalle-venta-empleado',
  templateUrl: './detalle-venta-empleado.component.html',
  styleUrls: ['./detalle-venta-empleado.component.css']
})
export class DetalleVentaEmpleadoComponent {

  detalleVentaEmpleadoDTO: DetalleVentaEmpleadoDTO | undefined;
  codigoVenta = 0;
  alerta!: Alerta;

  constructor(private route: ActivatedRoute, private empleadoService: EmpleadoService,
    private adminService: AdministradorService,
    private tokenService: TokenService
  ) {

    this.route.params.subscribe(params => {
      this.codigoVenta = params['codigoVenta']
    })

    let registroConsultado = this.verDetalleVentaEmpleado();

    if (registroConsultado != undefined) {
      this.detalleVentaEmpleadoDTO = registroConsultado;
    }

  }

  public verDetalleVentaEmpleado() {

    if(this.tokenService.getRole() == 'empleado'){
      this.empleadoService.verDetalleVentaEmpleado(this.codigoVenta).subscribe({
        next: data => {
          console.log(data.respuesta);
          this.detalleVentaEmpleadoDTO = data.respuesta;
        },
        error: error => {
          this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
          console.log(error);
        }
      })
    }else if(this.tokenService.getRole() == 'admin'){
      this.adminService.verDetalleVentaEmpleado(this.codigoVenta).subscribe({
        next: data => {
          console.log(data.respuesta);
          this.detalleVentaEmpleadoDTO = data.respuesta;
        },
        error: error => {
          this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
          console.log(error);
        }
      })
    }

  }



}
