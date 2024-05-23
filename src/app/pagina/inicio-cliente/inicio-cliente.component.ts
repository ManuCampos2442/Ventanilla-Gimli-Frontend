import { Component } from '@angular/core';
import { FiltroBusquedaDTO } from 'src/app/model/FiltroBusquedaDTO';
import { ItemProductoDTO } from 'src/app/model/ItemProductoDTO';
import { Alerta } from 'src/app/model/alerta';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { VentanillaService } from 'src/app/servicios/ventanilla.service';

@Component({
  selector: 'app-inicio-cliente',
  templateUrl: './inicio-cliente.component.html',
  styleUrls: ['./inicio-cliente.component.css']
})
export class InicioClienteComponent {

  itemProductoDTO: ItemProductoDTO[];
  productosPorNombre: ItemProductoDTO;

  filtroBusquedaDTO: FiltroBusquedaDTO;

  alerta!: Alerta;

  totalProductos: number = 0;
  page: number = 1;
  itemsPerPage: number = 4;

  constructor(private ventanilla: VentanillaService) {

    this.itemProductoDTO = [];
    this.listarProductos();



    this.filtroBusquedaDTO = new FiltroBusquedaDTO();

    this.productosPorNombre = new FiltroBusquedaDTO;

  }


  totalPages(): number[] {
    const totalPages = Math.ceil(this.totalProductos / this.itemsPerPage);
    return Array(totalPages).fill(0).map((x, i) => i);
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

  public filtrarProductosPorNombre() {

    let nombreProducto = this.filtroBusquedaDTO.nombreProducto;

    if (nombreProducto == "") {
      this.alerta = { tipo: "danger", mensaje: "Ingrese el nombre de un producto" }
    } else {
      this.ventanilla.filtrarProductosPorNombre(nombreProducto).subscribe({
        next: data => {
          this.productosPorNombre = data.respuesta;

        },
        error: error => {
          this.alerta = { tipo: "danger", mensaje: error.error.respuesta }
          console.log(error);
        }
      });
    }


  }


}
