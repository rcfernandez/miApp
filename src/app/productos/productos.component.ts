import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '../services/categorias.service';
import { Producto } from '../models/producto.model';
import { Categoria } from '../models/categoria.model';


declare var M;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  productos
  myForm: FormGroup;
  categorias

  constructor(
    public productosService: ProductosService,
    public categoriasService: CategoriasService,
    private fb: FormBuilder,
    ) {
      //validaciones
      this.myForm = this.fb.group({
        _id: [''],
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        precio: ['', Validators.required],
        cantidad: [''],
        categoria: [''],
        destacado: [''],
      });

      this.traerCategorias();
      
    }

  ngOnInit(): void {
    this.traerProductos();
  }

  traerProductos() {
    this.productosService.getProductos().subscribe((data) => {
      this.productos = data;
    });
  }

  alta() {
    if(this.myForm.controls["_id"].value){
      // se modifica
      this.productosService.updateProducto(this.myForm.controls["_id"].value, this.myForm.value).subscribe((data) => {
        this.myForm.reset();
        this.traerProductos();
        M.toast({html: 'Se modifico correctamente', classes: 'rounded'})
      });
    }
    // sino agrega uno nuevo
    else{
      this.productosService.createProducto(this.myForm.value).subscribe((data) => {
        this.myForm.reset();
        this.traerProductos();
        M.toast({html: 'Se agrego correctamente', classes: 'rounded'})
      });
      
    }
  }

  modificar(producto: Producto) {
    this.productosService.selectedProducto = producto;
    // this.myForm = this.fb.group({
    //   _id: [this.productosService.selectedProducto._id],
    //   nombre: [this.productosService.selectedProducto.nombre, Validators.required],
    //   categoria: [this.productosService.selectedProducto.categoria["_id"]],
    // });
    this.myForm = this.fb.group({
      _id: [producto._id],
      nombre: [producto, Validators.required],
      descripcion: [producto.descripcion, Validators.required],
      precio: [producto.precio, Validators.required],
      cantidad: [producto.cantidad],
      categoria: [producto.categoria],
      destacado: [producto.destacado]
    });
  }

  onChange(val) {
    // this.productosService.selectedProducto.categoria = val;
    console.log(this.productosService.selectedProducto.categoria);
}

  borrar(id) {
    if(confirm("Estas seguro de querer borrarlo?")){
      this.productosService.deleteProducto(id).subscribe(() => {
        this.traerProductos();
        M.toast({html: 'Se borro correctamente', classes: 'rounded'})
      });
    }
  }

  resetForm() {
    this.myForm.reset();
    this.traerProductos();
  }

  traerCategorias(){
    this.categoriasService.getCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }

} /*class*/



