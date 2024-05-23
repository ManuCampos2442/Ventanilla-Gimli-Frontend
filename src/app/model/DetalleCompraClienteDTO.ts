export interface DetalleCompraClienteDTO{
    codigo: number;
    nombreProducto: string;
    descripcion: string;
    precio: number;
    cantidad: number;
    fechaVenta: string;
    horaDeVenta: string;
    direccion: string;
    devueltas: number;
    nombreCliente: string;
    correoCliente: string;
    telefono: string;
    venta: number;
}