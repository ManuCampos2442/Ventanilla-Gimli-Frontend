import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './pagina/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearProductoComponent } from './pagina/crear-producto/crear-producto.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegistrarVentaEmpleadoComponent } from './pagina/registrar-venta-empleado/registrar-venta-empleado.component';
import { UsuarioInterceptor } from './interceptor/usuario.interceptor';
import { AlertaComponent } from './pagina/alerta/alerta.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { AgregarProductoComponent } from './pagina/agregar-producto/agregar-producto.component';
import { GestionProductosComponent } from './pagina/gestion-productos/gestion-productos.component';
import { DetalleRegistroProductoComponent } from './pagina/detalle-registro-producto/detalle-registro-producto.component';
import { InicioClienteComponent } from './pagina/inicio-cliente/inicio-cliente.component';
import { RegistroEmpleadoComponent } from './pagina/registro-empleado/registro-empleado.component';
import { RegistrarCompraClienteComponent } from './pagina/registrar-compra-cliente/registrar-compra-cliente.component';
import { ModificarPerfilClienteComponent } from './pagina/modificar-perfil-cliente/modificar-perfil-cliente.component';
import { PaginaInicioComponent } from './pagina/pagina-inicio/pagina-inicio.component';
import { EditarPerfilEmpleadoComponent } from './pagina/editar-perfil-empleado/editar-perfil-empleado.component';
import { DetalleProductoComponent } from './pagina/detalle-producto/detalle-producto.component';
import { EditarPerfilEmpleadoAdminComponent } from './pagina/editar-perfil-empleado-admin/editar-perfil-empleado-admin.component';
import { DetalleVentaEmpleadoComponent } from './pagina/detalle-venta-empleado/detalle-venta-empleado.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PoliticasSeguridadComponent } from './pagina/politicas-seguridad/politicas-seguridad.component';
import { CondicionesComponent } from './pagina/condiciones/condiciones.component';
import { ComprasRealizadasClienteComponent } from './pagina/compras-realizadas-cliente/compras-realizadas-cliente.component';
import { DetalleCompraClienteComponent } from './pagina/detalle-compra-cliente/detalle-compra-cliente.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    CrearProductoComponent,
    AlertaComponent,
    AgregarProductoComponent,
    DetalleRegistroProductoComponent,
    RegistroComponent,
    ModificarPerfilClienteComponent,
    InicioClienteComponent,
    ComprasRealizadasClienteComponent,
    LoginComponent,
    PoliticasSeguridadComponent,
    DetalleVentaEmpleadoComponent,
    EditarPerfilEmpleadoAdminComponent,
    DetalleProductoComponent,
    RegistrarCompraClienteComponent,
    RegistrarVentaEmpleadoComponent,
    AgregarProductoComponent,
    GestionProductosComponent,
    DetalleRegistroProductoComponent,
    InicioClienteComponent,
    EditarPerfilEmpleadoComponent,
    RegistroEmpleadoComponent,
    RegistrarCompraClienteComponent,
    ModificarPerfilClienteComponent,
    PaginaInicioComponent,
    EditarPerfilEmpleadoComponent,
    DetalleProductoComponent,
    EditarPerfilEmpleadoAdminComponent,
    DetalleVentaEmpleadoComponent,
    PoliticasSeguridadComponent,
    CondicionesComponent,
    ComprasRealizadasClienteComponent,
    DetalleCompraClienteComponent,
    DetalleCompraClienteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UsuarioInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
