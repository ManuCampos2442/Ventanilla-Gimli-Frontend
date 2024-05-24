import { Component } from '@angular/core';
import { AgregarProductoDTO } from 'src/app/model/AgregarProductoDTO';
import { Alerta } from 'src/app/model/alerta';
import { AdministradorService } from 'src/app/servicios/administrador.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { EmpleadoService } from 'src/app/servicios/empleado.service';
import { TokenService } from 'src/app/servicios/token.service';
import { VentanillaService } from 'src/app/servicios/ventanilla.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent {

  agregarProducto: AgregarProductoDTO;

  alerta!: Alerta;

  categorias: string[]

  nombresAlcoholes: string[]
  nombresDulces: string[]
  nombresGaseosas: string[]

  alcoholSeleccionado: string = '';
  dulceSeleccionado: string = '';
  gaseosaSeleccionada: string = '';

  private cargarCategorias() {
    this.ventanillaService.listarCategorias().subscribe({
      next: data => {
        console.log(this.categorias);
        this.categorias = data.respuesta;


      },
      error: error => {
        console.log(error);
      }
    });
  }

  public cargarListaAlcoholes() {
    this.ventanillaService.listarNombresAlcoholes(this.agregarProducto.categoria).subscribe({
      next: data => {
        this.nombresAlcoholes = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  public cargarListaDulces() {
    this.ventanillaService.listarNombresDulces(this.agregarProducto.categoria).subscribe({
      next: data => {
        this.nombresDulces = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  onCategoriaChange() {
    switch (this.agregarProducto.categoria) {
      case 'ALCOHOL':

        this.cargarListaAlcoholes();
        break;
      case 'DULCES':
        this.cargarListaDulces();
        break;
      default:
        // Si se selecciona otra categoría, mostrar todas las subcategorías

        break;
    }
  }

  constructor(private ventanillaService: VentanillaService,
    private empleadoService: EmpleadoService, private adminService: AdministradorService,
    private tokenService: TokenService) {

    this.agregarProducto = new AgregarProductoDTO();

    this.categorias = [];
    this.cargarCategorias();

    this.nombresAlcoholes = []
    this.nombresDulces = []
    this.nombresGaseosas = []

  }

  public registrar() {

    let codigo = this.tokenService.getCodigo();
    this.agregarProducto.codigoEmpleado = codigo
    console.log(codigo)

    console.log(this.agregarProducto.categoria)

    if (this.agregarProducto.cantidad <= 0) {
      this.alerta = { mensaje: "La cantidad del producto no puede ser menor o igual que cero", tipo: "danger" };
    }
    else if (this.agregarProducto.categoria == "") {
      this.alerta = { mensaje: "Seleccione una categoria", tipo: "danger" }
    }
    else if (this.agregarProducto.cantidad >= 100) {
      this.alerta = { mensaje: "La cantidad del producto no puede ser mayor o igual que 100", tipo: "danger" };
    } else {

      switch (this.agregarProducto.categoria) {
        case 'ALCOHOL':
          this.agregarProducto.nombre = this.alcoholSeleccionado
          break;
        case 'DULCES':
          this.agregarProducto.nombre = this.dulceSeleccionado
          break;
        default:
          this.agregarProducto.nombre = this.gaseosaSeleccionada
          break;
      }

      if (this.tokenService.getRole() == 'empleado') {
        this.empleadoService.agregarProducto(this.agregarProducto).subscribe({
          next: data => {
            this.alerta = { tipo: "success", mensaje: "Producto agregado con exito" }
            console.log(data);
            // this.router.navigate(['/login']);
          },
          error: (error: { error: { respuesta: any; }; }) => {
            this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
            console.log(error);
          }
        });
      } else if(this.tokenService.getRole() == 'admin'){
        this.adminService.agregarProducto(this.agregarProducto).subscribe({
          next: data => {
            this.alerta = { tipo: "success", mensaje: "Producto agregado con exito" }
            console.log(data);
            // this.router.navigate(['/login']);
          },
          error: (error: { error: { respuesta: any; }; }) => {
            this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
            console.log(error);
          }
        });
      }
    }
  }
}
