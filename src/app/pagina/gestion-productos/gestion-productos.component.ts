import { Component } from '@angular/core';
import { ItemRegistroProductoDTO } from 'src/app/model/ItemRegistroProductoDTO';
import { ItemVentaEmpleadoDTO } from 'src/app/model/ItemVentaEmpleadoDTO';
import { EmpleadoService } from 'src/app/servicios/empleado.service';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent {

  registroProductos: ItemRegistroProductoDTO[];
  ventasEmpleados: ItemVentaEmpleadoDTO[];
  totalVentas: number = 0;
  page: number = 1;
  pageSize = 10;
  itemsPerPage: number = 4;

  constructor(private empleadoService: EmpleadoService) {

    this.registroProductos = [];
    this.obtenerListaRegistros();

    this.ventasEmpleados = [];
    this.obtenerListaVentasEmpleados();
    this.totalVentas = Math.ceil(this.ventasEmpleados.length / this.pageSize);



  }



 totalPages(): number[] {
    const totalPages = Math.ceil(this.totalVentas / this.itemsPerPage);
    return Array(totalPages).fill(0).map((x, i) => i);
}


  public obtenerListaRegistros() {
    this.empleadoService.listarRegistrosAgreacionProductos().subscribe({
      next: data => {
        this.registroProductos = data.respuesta;
        console.log(this.registroProductos);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  public obtenerListaVentasEmpleados() {
    this.empleadoService.listaVentasEmpleados().subscribe({
      next: data => {
        this.ventasEmpleados = data.respuesta;
        this.totalVentas = this.ventasEmpleados.length;
      },
      error: error => {
        console.log(error);
      }
    })
  }

}
