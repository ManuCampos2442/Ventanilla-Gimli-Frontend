import { Component } from '@angular/core';
import { ItemComprasClienteDTO } from 'src/app/model/ItemComprasClienteDTO';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-compras-realizadas-cliente',
  templateUrl: './compras-realizadas-cliente.component.html',
  styleUrls: ['./compras-realizadas-cliente.component.css']
})
export class ComprasRealizadasClienteComponent {

  itemCompra: ItemComprasClienteDTO[];


  totalCompras: number = 0;
  page: number = 1;
  itemsPerPage: number = 4;

  constructor(private cliente: ClienteService,
    private token: TokenService
  ) {

    this.itemCompra = [];
    this.listarComprasRealizadas();

  }

  public listarComprasRealizadas() {
    this.cliente.comprasRealizadas(this.token.getCodigo()).subscribe({
      next: data => {
        this.itemCompra = data.respuesta;
        this.totalCompras = this.itemCompra.length;
        console.log(this.itemCompra);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  totalPages(): number[] {
    const totalPages = Math.ceil(this.totalCompras / this.itemsPerPage);
    return Array(totalPages).fill(0).map((x, i) => i);
  }
}
