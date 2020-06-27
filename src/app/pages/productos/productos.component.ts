import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '../../services/categorias.service';
import { Producto } from '../../models/producto.model';
import { Categoria } from 'src/app/models/categoria.model';
import { Paginado } from 'src/app/models/paginate.model';


declare var M;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})

export class ProductosComponent implements OnInit {
  productos: Producto[];
  categorias: Categoria[];
  myForm: FormGroup;
  claseLabel = "";

  paginado: Paginado;
  columns=[];

  // page={
  //   totalElements:0,
  //   pageNumber:0,
  //   size:20
  // }

  constructor(
    public productosService: ProductosService,
    public categoriasService: CategoriasService,
    private fb: FormBuilder,
    ) {
      this.prepareForm();
      this.prepareColumns()
      this.traerCategorias();      
    }

  ngOnInit(): void {
    this.traerProductos();    
    this.setPage({ offset: 0 }); //SetPage en base a una pagina consulta productos a express
  }

  prepareForm(){
    this.myForm = this.fb.group({
      _id: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0],
      cantidad: [0],
      categoria: ['', Validators.required],
      destacado: [0],
    });
  }

  prepareColumns(){
    this.columns=[
      { name:'Nombre', prop:'nombre' },
      { name:'Descripcion',prop:'descripcion' },
      { name:'Precio', prop:'precio' }, 
      { name:'Cantidad',prop:'cantidad' }, 
      { name:'Categoria',prop:'categoria.descripcion' },
      { name:'Destacado',prop:'destacado' }, 
    ]
  }

  traerProductos() {
    this.productosService.getProductos2().subscribe((data) => {
      this.paginado = data as Paginado;
      this.paginado.docs = data["docs"] as Producto[];
    });
  }

  alta() {

    if(this.myForm.controls["_id"].value){
      // modificacion
      this.productosService.updateProducto(this.myForm.controls["_id"].value, this.myForm.value).subscribe((data) => {
        this.resetForm();
        this.ngOnInit()
        M.toast({html: 'Se modifico correctamente', classes: 'rounded'})
      });
    }
    // alta
    else{
      this.productosService.createProducto(this.myForm.value).subscribe((data) => {
        this.resetForm();
        this.ngOnInit();
        M.toast({html: 'Se agrego correctamente', classes: 'rounded'})
      });
      
    }
  }

  modificar(producto: Producto) {
    this.productosService.selectedProducto = producto;
    this.myForm = this.fb.group({
      _id: [producto._id],
      nombre: [producto.nombre, Validators.required],
      descripcion: [producto.descripcion, Validators.required],
      precio: [producto.precio, Validators.required],
      cantidad: [producto.cantidad],
      categoria: [producto.categoria._id],
      destacado: [producto.destacado]
    });
    this.claseLabel="active";
  }

  modificar2(event) {
    if(event.type == 'click') {
      this.modificar(event.row);
      console.log(event.row);
    }
  }



  borrar(id) {
    if(confirm("Estas seguro de querer borrarlo?")){
      this.productosService.deleteProducto(id).subscribe(() => {
        this.ngOnInit();
        M.toast({html: 'Se borro correctamente', classes: 'rounded'})
      });
    }
  }

  resetForm() {
    this.claseLabel=""; // quita la clase="active" de los labels
    this.prepareForm();
    this.traerProductos();
  }

  traerCategorias(){
    this.categoriasService.getCategorias().subscribe((data) => {
      this.categorias = data as Categoria[];
    });
  }

  setPage(pageInfo){
    this.productosService.getProductos2(pageInfo).subscribe( (data) =>{
      
      //Registros de productos (Informacion)
      this.productos= data['docs'] as Producto[];
     
      this.paginado = data as Paginado;
      //cantidad total
      //this.paginado.totalDocs = data["totalDocs"];
      //Cantidad de registros por pagina
      //this.paginado.limit = data["limit"];
      
      //La pagina que estoy consultando
      this.paginado.page = pageInfo["offset"];
    })
  }

} /*class*/



