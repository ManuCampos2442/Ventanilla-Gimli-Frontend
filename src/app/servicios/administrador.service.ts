import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AgregarProductoDTO } from "../model/AgregarProductoDTO";
import { MensajeDTO } from "../model/mensaje-dto";
import { RegistroEmpleadoDTO } from "../model/registro-empleado-dto";
import { ModificarEmpleadoAdminDTO } from "../model/ModificarEmpleadoAdminDTO";

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private userUrl = "http://localhost:8080/api/admins";

  constructor(private http: HttpClient) { }

  public obtenerClientePorCorreo(correo: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/obtener-codigo-cliente/${correo}`);
  }
  public registrarEmpleado(empleado: RegistroEmpleadoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userUrl}/registrar-empleado`, empleado);
  }
  public listarCedulas(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/lista-cedulas-empleados`);
  }
  public editarPerfilEmpleado(empleadoDTO: ModificarEmpleadoAdminDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.userUrl}/editar-perfil-empleado`, empleadoDTO);
  }
  public eliminarCuentaEmpleado(codigo: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.userUrl}/eliminar-cuenta-empleado/${codigo}`);
  }
  public listarEmpleadoCedulaNombre(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/lista-empleados-cedula-nombre`);
  }
  public agregarProducto(producto: AgregarProductoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userUrl}/agregar-producto`, producto);
  }
  public listarRegistrosAgreacionProductos(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/listar-registros-agregacion-productos`);
  }
  public listaVentasEmpleados(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/listar-ventas-empleados`);
  }
  public verDetalleRegistro(codigoRegistro: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/detalle-registro/${codigoRegistro}`);
  }
  public verDetalleVentaEmpleado(codigoVenta: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/detalle-venta-empleado/${codigoVenta}`);
  }


}
