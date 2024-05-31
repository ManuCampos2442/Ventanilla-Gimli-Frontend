import { Component } from '@angular/core';
import { RegistroCompraClienteDTO } from 'src/app/model/RegistroCompraClienteDTO';
import { RegistroProductoDTO } from 'src/app/model/RegistroProductoDTO';
import { RegistroVentaEmpleadoDTO } from 'src/app/model/RegistroVentaEmpleadoDTO';
import { Alerta } from 'src/app/model/alerta';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { EmpleadoService } from 'src/app/servicios/empleado.service';
import { TokenService } from 'src/app/servicios/token.service';
import { VentanillaService } from 'src/app/servicios/ventanilla.service';

@Component({
  selector: 'app-registrar-compra-cliente',
  templateUrl: './registrar-compra-cliente.component.html',
  styleUrls: ['./registrar-compra-cliente.component.css']
})
export class RegistrarCompraClienteComponent {
  alerta!: Alerta;

  categorias: string[]

  subcategorias: string[]
  subcategoriasAux: string[]

  nombresAlcoholes: string[]
  nombresDulces: string[]
  nombresGaseosas: string[]

  registroProductoDTO: RegistroProductoDTO;
  registroCompraClienteDTO: RegistroCompraClienteDTO;


  alcoholSeleccionado: string = '';
  dulceSeleccionado: string = '';
  gaseosaSeleccionada: string = '';

  tipoCliente: string = '';
  correoCliente: string = '';

  constructor(private ventanillaService: VentanillaService, private clienteService: ClienteService,
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
    this.registroCompraClienteDTO = new RegistroCompraClienteDTO();


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
    //this.RegistroCompraClienteDTO.fechaVenta = fechaActual;
    //this.registroVentaEmpleadoDTO.horaDeVenta = horaActual;
    this.registroCompraClienteDTO.codigoCliente = this.tokenService.getCodigo();
    console.log(this.registroCompraClienteDTO.codigoCliente)

    switch (this.registroProductoDTO.categoria) {
      case 'ALCOHOL':
        this.registroCompraClienteDTO.nombreProducto = this.alcoholSeleccionado
        break;
      case 'DULCES':
        this.registroCompraClienteDTO.nombreProducto = this.dulceSeleccionado
        break;
      default:
        this.registroCompraClienteDTO.nombreProducto = this.gaseosaSeleccionada
        break;
    }

    this.clienteService.registrarCompraCliente(this.registroCompraClienteDTO).subscribe({
      next: data => {
        this.alerta = { tipo: "success", mensaje: "Venta agregado con éxito" }
        console.log(data);
        this.registroCompraClienteDTO = {
          cantidad: 0,
          nombreProducto: "",
          direccion: "",
          dinero: 0,
          codigoCliente: this.tokenService.getCodigo()
        }
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
    if (!this.registroCompraClienteDTO.cantidad || !this.registroCompraClienteDTO.dinero) {
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

  public obtenerCodigoClientePorCorreo() {
    /* if (this.tipoCliente == "casual") {
      this.codigoCliente = null;
      console.log(this.codigoCliente);
      this.registrarVentaEmpleado(); // Llamar a registrarVentaEmpleado directamente si el tipo de cliente es "Casual"
    } else {

      // Llamar a obtenerClientePorCorreo() solo si el tipo de cliente no es "Casual"
      this.clienteService.obtenerClientePorCorreo(this.correoCliente).subscribe({
        next: data => {
          this.codigoCliente = data.respuesta;
          console.log(this.codigoCliente);
          this.registrarVentaEmpleado(); // Llamar a registrarVentaEmpleado después de obtener el código del cliente
        },
        error: error => {
          console.log(error);
          this.alerta = { mensaje: error.error, tipo: "danger" };
        }
      });
    } */
  }


  public registrarVentaEmpleado() {
    //this.registroCompraClienteDTO.cantidad = 1700;
    //  this.registroCompraClienteDTO.codigoCliente = this.codigoCliente; // Asignar el código del cliente obtenido correctamente

  }


}
