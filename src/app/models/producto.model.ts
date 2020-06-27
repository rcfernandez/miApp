export class Producto {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  categoria: any;
  destacado: number;

  constructor(
    id = '',
    nombre = '',
    descripcion = '',
    precio = 0,
    cantidad = 0,
    categoria = {},
    destacado = 0
  ) {
    this._id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.cantidad = cantidad;
    this.categoria = categoria;
    this.destacado = destacado;
  }
}
