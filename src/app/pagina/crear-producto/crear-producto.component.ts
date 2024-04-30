import { Component } from '@angular/core';
import { RegistroProductoDTO } from 'src/app/model/RegistroProductoDTO';
import { Alerta } from 'src/app/model/alerta';
import { VentanillaService } from 'src/app/servicios/ventanilla.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {

  alerta!: Alerta;

  categorias: string[]

  subcategorias: string[]
  subcategoriasAux: string[]

  nombresAlcoholes: string[]

  registroProductoDTO: RegistroProductoDTO;

  constructor(private ventanillaService: VentanillaService) {

    this.categorias = [];
    this.cargarCategorias();

    this.subcategorias = [];
    this.cargarSubcategorias();
    this.subcategoriasAux = [];

    this.nombresAlcoholes = []

    this.registroProductoDTO = new RegistroProductoDTO();
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

  private cargarListaAlcoholes(categoria : string) {
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

  onCategoriaChange() {
    switch (this.registroProductoDTO.categoria) {
      case 'ALCOHOL':
        this.subcategoriasAux = this.subcategorias.slice(0, 6);
        this.cargarListaAlcoholes(this.registroProductoDTO.categoria);
        break;
      case 'DULCES':
        // Obtener el índice de 'FRITURA' en la lista de categorías
        const indiceFritura = this.categorias.indexOf('DULCES');
       
        if (indiceFritura !== -1 && indiceFritura + 5 <= 11) {
          this.subcategoriasAux = this.subcategorias.slice(indiceFritura + 5, 17);
        } else {
          // Si 'FRITURA' no se encuentra o no hay suficientes subcategorías después de 'FRITURA', mostrar todas las subcategorías
          this.subcategoriasAux = this.subcategorias;
        }
        break;
      default:
        const indiceGaseosa = this.categorias.indexOf('GASEOSA');
        // Si se selecciona otra categoría, mostrar todas las subcategorías
        this.subcategoriasAux = this.subcategorias.slice(indiceGaseosa + 15);
        break;
    }
  }

  public registrar() {
  
      this.ventanillaService.registrarProducto(this.registroProductoDTO).subscribe({
        next: data => {
          alert("Registro Exitoso")
          console.log(data);
         // this.router.navigate(['/login']);
        },
        error: (error: { error: { respuesta: any; }; }) => {
          this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
          console.log(error);
        }
      });
    } 

    // console.log(this.registroPacienteDTO);

    // if(this.archivos != null && this.archivos.length > 0){
    //   console.log(this.registroPacienteDTO);
    //   }else{
    //   console.log("Debe cargar una foto");
    //   } 
  



}
