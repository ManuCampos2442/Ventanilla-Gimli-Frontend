import { Component } from '@angular/core';
import { ItemProductoDTO } from 'src/app/model/ItemProductoDTO';
import { ItemRegistroProductoDTO } from 'src/app/model/ItemRegistroProductoDTO';
import { ItemVentaEmpleadoDTO } from 'src/app/model/ItemVentaEmpleadoDTO';
import { AdministradorService } from 'src/app/servicios/administrador.service';
import { EmpleadoService } from 'src/app/servicios/empleado.service';
import { TokenService } from 'src/app/servicios/token.service';
import { VentanillaService } from 'src/app/servicios/ventanilla.service';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent {

  registroProductos: ItemRegistroProductoDTO[];
  ventasEmpleados: ItemVentaEmpleadoDTO[];
  itemProductoDTO: ItemProductoDTO[];

  totalVentas: number = 0;
  page: number = 1;
  pageSize = 10;
  itemsPerPage: number = 4;

  totalProductos: number = 0;

  constructor(private empleadoService: EmpleadoService,
    private ventanilla: VentanillaService, private adminService: AdministradorService,
    private tokenService: TokenService
  ) {

    this.itemProductoDTO = [];
    this.listarProductos();

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

    if (this.tokenService.getRole() == 'empleado') {
      this.empleadoService.listarRegistrosAgreacionProductos().subscribe({
        next: data => {
          this.registroProductos = data.respuesta;
          console.log(this.registroProductos);
        },
        error: error => {
          console.log(error);
        }
      });
    } else if (this.tokenService.getRole() == 'admin') {
      this.adminService.listarRegistrosAgreacionProductos().subscribe({
        next: data => {
          this.registroProductos = data.respuesta;
          console.log(this.registroProductos);
        },
        error: error => {
          console.log(error);
        }
      });
    }


  }

  public obtenerListaVentasEmpleados() {

    if (this.tokenService.getRole() == 'empleado') {
      this.empleadoService.listaVentasEmpleados().subscribe({
        next: data => {
          this.ventasEmpleados = data.respuesta;
          this.totalVentas = this.ventasEmpleados.length;
        },
        error: error => {
          console.log(error);
        }
      })
    } else if (this.tokenService.getRole() == 'admin') {
      this.adminService.listaVentasEmpleados().subscribe({
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

  public listarProductos() {

    this.ventanilla.listarProductos().subscribe({
      next: data => {
        this.itemProductoDTO = data.respuesta;
        this.totalProductos = this.itemProductoDTO.length;
        console.log(this.itemProductoDTO);
      },
      error: error => {
        console.log(error);
      }
    });
  }

}
