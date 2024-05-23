import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleProductoDTO } from 'src/app/model/DetalleProductoDTO';
import { Alerta } from 'src/app/model/alerta';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { VentanillaService } from 'src/app/servicios/ventanilla.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent {

  detalleProductoDTO: DetalleProductoDTO | undefined;
  alerta!: Alerta;

  codigoProducto = 0;

  constructor(private route: ActivatedRoute, private ventanillaService: VentanillaService) {

    this.route.params.subscribe(params => {
      this.codigoProducto = params['codigoProducto']
    })

    let  productoConsultado = this.verDetalleRegistroProducto();

    if(productoConsultado != undefined){
      this.detalleProductoDTO = productoConsultado;
    }

  }

  public verDetalleRegistroProducto(){
    this.ventanillaService.verDetalleProducto(this.codigoProducto).subscribe({
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
