import { Component } from '@angular/core';
import { flatMap, map, of } from 'rxjs';
import { RegistroProductoDTO } from 'src/app/model/RegistroProductoDTO';
import { RegistroVentaEmpleadoDTO } from 'src/app/model/RegistroVentaEmpleadoDTO';
import { Alerta } from 'src/app/model/alerta';
import { MensajeDTO } from 'src/app/model/mensaje-dto';
import { EmpleadoService } from 'src/app/servicios/empleado.service';
import { TokenService } from 'src/app/servicios/token.service';
import { VentanillaService } from 'src/app/servicios/ventanilla.service';

@Component({
  selector: 'app-registrar-venta-empleado',
  templateUrl: './registrar-venta-empleado.component.html',
  styleUrls: ['./registrar-venta-empleado.component.css']
})
export class RegistrarVentaEmpleadoComponent {

  alerta!: Alerta;

  categorias: string[]

  subcategorias: string[]
  subcategoriasAux: string[]

  nombresAlcoholes: string[]
  nombresDulces: string[]
  nombresGaseosas: string[]

  registroProductoDTO: RegistroProductoDTO;
  registroVentaEmpleadoDTO: RegistroVentaEmpleadoDTO;

  alcoholSeleccionado: string = '';
  dulceSeleccionado: string = '';
  gaseosaSeleccionada: string = '';

  tipoCliente: string = '';
  correoCliente: string = '';


  constructor(private ventanillaService: VentanillaService, private empleadoService: EmpleadoService,
    private tokenService: TokenService) {

    this.categorias = [];
    this.cargarCategorias();


    this.subcategorias = [];
    this.cargarSubcategorias();
    this.subcategoriasAux = [];

    this.nombresAlcoholes = []
    this.nombresDulces = []
    this.nombresGaseosas = []

    this.registroProductoDTO = new RegistroProductoDTO();
    this.registroVentaEmpleadoDTO = new RegistroVentaEmpleadoDTO();


  }

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

  private cargarSubcategorias() {
    this.ventanillaService.listarSubcategorias().subscribe({
      next: data => {
        console.log(this.subcategorias);
        this.subcategorias = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  onCategoriaChange() {
    switch (this.registroProductoDTO.categoria) {
      case 'ALCOHOL':

        this.cargarListaAlcoholes(this.registroProductoDTO.categoria);
        break;

      case 'DULCES':

        this.cargarListaDulces(this.registroProductoDTO.categoria);


        break;
      default:

        this.cargarListaGaseosas(this.registroProductoDTO.categoria);
        break;
    }
  }

  private cargarListaAlcoholes(categoria: string) {
    this.ventanillaService.listarNombresAlcoholes(categoria).subscribe({
      next: data => {
        console.log(this.subcategorias);
        this.nombresAlcoholes = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  private cargarListaDulces(categoria: string) {
    this.ventanillaService.listarNombresDulces(categoria).subscribe({
      next: data => {
        console.log(this.subcategorias);
        this.nombresDulces = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  private cargarListaGaseosas(categoria: string) {
    this.ventanillaService.listarNombresGaseosas(categoria).subscribe({
      next: data => {
        console.log(this.subcategorias);
        this.nombresGaseosas = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }


  codigoCliente = null;

  public registrar() {
    const fechaActual: string = new Date().toISOString().split('T')[0];
    const horaActual: string = new Date().toLocaleTimeString('en-US', { hour12: false });

    // Asignar la fecha actual a la propiedad fechaVenta
    this.registroVentaEmpleadoDTO.fechaVenta = fechaActual;
    this.registroVentaEmpleadoDTO.horaDeVenta = horaActual;
    this.registroVentaEmpleadoDTO.codigoEmpleado = this.tokenService.getCodigo();
    console.log(this.registroVentaEmpleadoDTO.codigoEmpleado)

    switch (this.registroProductoDTO.categoria) {
      case 'ALCOHOL':
        this.registroVentaEmpleadoDTO.nombreProducto = this.alcoholSeleccionado
        break;
      case 'DULCES':
        this.registroVentaEmpleadoDTO.nombreProducto = this.dulceSeleccionado
        break;
      case 'GASEOSA':
        this.registroVentaEmpleadoDTO.nombreProducto = this.gaseosaSeleccionada
        break;
    }

    this.obtenerCodigoClientePorCorreo();
  }

  public obtenerCodigoClientePorCorreo() {
    if (this.tipoCliente == "casual") {
      this.codigoCliente = null;
      console.log(this.codigoCliente);
      this.registrarVentaEmpleado(); // Llamar a registrarVentaEmpleado directamente si el tipo de cliente es "Casual"
    } else {

      // Llamar a obtenerClientePorCorreo() solo si el tipo de cliente no es "Casual"
      this.ventanillaService.obtenerClientePorCorreo(this.correoCliente).subscribe({
        next: data => {
          this.codigoCliente = data.respuesta;
          console.log(this.codigoCliente);
          this.registrarVentaEmpleado(); // Llamar a registrarVentaEmpleado después de obtener el código del cliente
        },
        error: error => {
          console.log(error);
          this.alerta = { mensaje: "El correo ingresado no existe", tipo: "danger" };
        }
      });
    }
  }


  public registrarVentaEmpleado() {

    const fechaActual: string = new Date().toISOString().split('T')[0];
    const horaActual: string = new Date().toLocaleTimeString('en-US', { hour12: false });

    this.registroVentaEmpleadoDTO.precioUnitario = 1700;
    this.registroVentaEmpleadoDTO.codigoCliente = this.codigoCliente; // Asignar el código del cliente obtenido correctamente
    this.ventanillaService.registrarVentaEmpleado(this.registroVentaEmpleadoDTO).subscribe({
      next: data => {
        this.alerta = { tipo: "success", mensaje: "Venta agregado con éxito" }
        console.log(data);
        this.registroVentaEmpleadoDTO = {
          cantidad: 0,
          codigoCliente: this.codigoCliente,
          codigoEmpleado: this.tokenService.getCodigo(),
          dinero: 0,
          fechaVenta: fechaActual,
          horaDeVenta: horaActual,
          nombreProducto: "",
          precioUnitario: 0
        }
        this.correoCliente = "";
        this.registroProductoDTO = {
          categoria: "",
          descripcion: "",
          cantidad: 0,
          subcategoria: "",
          nombre: "",
          precio: 0,
          proveedor: ""
        }
      },
      error: (error: { error: { respuesta: any; }; }) => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
        console.log(error);
      }
    });
  }

  camposVacios(): boolean {
    if (!this.registroVentaEmpleadoDTO.cantidad || !this.registroVentaEmpleadoDTO.dinero ||
      !this.tipoCliente || !this.registroProductoDTO.categoria) {
      return true;
    }

    switch (this.registroProductoDTO.categoria) {
      case 'ALCOHOL':
        return !this.alcoholSeleccionado;
      case 'DULCES':
        return !this.dulceSeleccionado;
      case 'GASEOSA':
        return !this.gaseosaSeleccionada;
      default:
        return true;
    }
  }


}
