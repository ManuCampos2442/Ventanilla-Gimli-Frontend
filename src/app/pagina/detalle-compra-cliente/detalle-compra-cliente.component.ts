import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleCompraClienteDTO } from 'src/app/model/DetalleCompraClienteDTO';
import { Alerta } from 'src/app/model/alerta';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-detalle-compra-cliente',
  templateUrl: './detalle-compra-cliente.component.html',
  styleUrls: ['./detalle-compra-cliente.component.css']
})
export class DetalleCompraClienteComponent {

  detalle: DetalleCompraClienteDTO | undefined;
  codigoRegistro = 0;

  alerta!: Alerta;

  constructor(private route: ActivatedRoute,
    private clienteServide: ClienteService
  ){
  
    this.route.params.subscribe(params => {
      this.codigoRegistro = params['codigoCompra']
      })
      
      let  registroConsultado = this.verDetalleCompraCliente();
  
      if(registroConsultado != undefined){
        this.detalle = registroConsultado;
      }

  }

  public verDetalleCompraCliente(){
    this.clienteServide.verDetalleCompraCliente(this.codigoRegistro).subscribe({
      next: data => {
        this.detalle = data.respuesta;
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
        console.log(error);
      }
    });
  }

}
