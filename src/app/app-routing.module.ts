import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearProductoComponent } from './pagina/crear-producto/crear-producto.component';
import { RegistrarVentaEmpleadoComponent } from './pagina/registrar-venta-empleado/registrar-venta-empleado.component';
import { LoginComponent } from './pagina/login/login.component';
import { LoginGuard } from './guards/permiso.service';
import { RolesGuard } from './guards/roles.service';
import { AgregarProductoComponent } from './pagina/agregar-producto/agregar-producto.component';
import { GestionProductosComponent } from './pagina/gestion-productos/gestion-productos.component';
import { DetalleRegistroProductoComponent } from './pagina/detalle-registro-producto/detalle-registro-producto.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { InicioClienteComponent } from './pagina/inicio-cliente/inicio-cliente.component';
import { RegistroEmpleadoComponent } from './pagina/registro-empleado/registro-empleado.component';
import { RegistrarCompraClienteComponent } from './pagina/registrar-compra-cliente/registrar-compra-cliente.component';
import { ModificarPerfilClienteComponent } from './pagina/modificar-perfil-cliente/modificar-perfil-cliente.component';
import { PaginaInicioComponent } from './pagina/pagina-inicio/pagina-inicio.component';
import { EditarPerfilEmpleadoComponent } from './pagina/editar-perfil-empleado/editar-perfil-empleado.component';
import { DetalleProductoComponent } from './pagina/detalle-producto/detalle-producto.component';
import { EditarPerfilEmpleadoAdminComponent } from './pagina/editar-perfil-empleado-admin/editar-perfil-empleado-admin.component';
import { DetalleVentaEmpleadoComponent } from './pagina/detalle-venta-empleado/detalle-venta-empleado.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", component: PaginaInicioComponent },
  { path: "registro", component: RegistroComponent },
  { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
  { path: "registro-empleado", component: RegistroEmpleadoComponent },
  {
    path: "crear-producto", component: CrearProductoComponent, canActivate: [RolesGuard], data: {
      expectedRole: ["admin"]
    } 
  },
  {
    path: "editar-perfil-empleado-admin", component: EditarPerfilEmpleadoAdminComponent, canActivate: [RolesGuard], data: {
      expectedRole: ["admin"]
    } 
  },
  {
    path: "detalle-registro-producto/:codigoRegistro", component: DetalleRegistroProductoComponent, canActivate: [RolesGuard], data: {
      expectedRole: ["admin", "empleado"]
    }
  },
  {
    path: "detalle-venta-empleado/:codigoVenta", component: DetalleVentaEmpleadoComponent, canActivate: [RolesGuard], data: {
      expectedRole: ["admin", "empleado"]
    }
  },
  {
    path: "inicio-cliente", component: InicioClienteComponent, canActivate: [RolesGuard], data: {
      expectedRole: ["cliente"]
    }
  },
  {
    path: "registrar-compra-cliente", component: RegistrarCompraClienteComponent, canActivate: [RolesGuard], data: {
      expectedRole: ["cliente"]
    }
  },
  {
    path: "detalle-producto/:codigoProducto", component: DetalleProductoComponent, canActivate: [RolesGuard], data: {
      expectedRole: ["cliente"]
    }
  },
  {
    path: "modificar-perfil-cliente", component: ModificarPerfilClienteComponent, canActivate: [RolesGuard], data: {
      expectedRole: ["cliente"]
    }
  },
  {
    path: "modificar-perfil-empleado", component: EditarPerfilEmpleadoComponent, canActivate: [RolesGuard], data: {
      expectedRole: ["empleado"]
    }
  },
  {
    path: "registrar-venta-empleado", component: RegistrarVentaEmpleadoComponent, canActivate: [RolesGuard], data: {
      expectedRole: ["empleado"]
    }
  },
  {
    path: "gestion-productos", component: GestionProductosComponent, canActivate: [RolesGuard], data: {
      expectedRole: ["admin", "empleado"]
    }
  },
  {
    path: "agregar-producto", component: AgregarProductoComponent, canActivate: [RolesGuard], data: {
      expectedRole: ["admin", "empleado"]
    }
  },
  {
    path: "registro-empleadp", component: RegistroEmpleadoComponent, canActivate: [RolesGuard], data: {
      expectedRole: ["admin"]
    }
  },
  { path: "**", pathMatch: "full", redirectTo: "" }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
