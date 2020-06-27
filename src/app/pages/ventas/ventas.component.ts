import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { VentasService } from 'src/app/services/ventas.service';
import { Venta } from 'src/app/models/venta.model';
import { Usuario } from 'src/app/models/usuario.model';
import { Producto } from 'src/app/models/producto.model';
import { Dato } from 'src/app/models/dato.model';

declare const M;

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
})
export class VentasComponent implements OnInit {
  ventas: Venta[];
  productos: Producto[];
  usuarios: Usuario[];
  myForm: FormGroup;
  claseLabel = "";

  datos: Dato;
  columnas: any[]

  constructor(
    public ventasService: VentasService,
    public productosService: ProductosService,
    public usuariosService: UsuariosService,
    private fb: FormBuilder
  ) {

    this.columnas=[
      { name:'fecha', prop:'fecha' },
      { name:'usuario',prop:'usuario.usuario' },
      { name:'productos', prop:'productos.nombre' }, 
      { name:'total',prop:'total' }, 
      { name:'estado',prop:'estado' }
    ]
    
    this.prepareForm();
    this.traerProductos();
    this.traerUsuarios();
  }

  ngOnInit(): void {
    this.setPage({ offset: 0 });
    this.traerVentas();
  }

  prepareForm(){
    this.myForm = this.fb.group({
      _id: [''],
      fecha: ['',Validators.required],
      usuario: ['',Validators.required],
      productos: ['',Validators.required],
      total: ['',Validators.required],
      estado: ['']
    });
  }

  traerVentas() {
    this.ventasService.getVentas().subscribe((data) => {
      this.datos = data as Dato;
      console.log("Datos de data: " + this.datos)
      //this.ventas = data["docs"];
      console.log("Datos de columnas: " + this.columnas)
      
    });
  }

  traerUsuarios() {
    this.usuariosService.getUsuarios().subscribe((data) => {
      this.usuarios = data as Usuario[];
    });
  }

  traerProductos() {
    this.productosService.getProductos().subscribe((data) => {
      this.productos = data as Producto[];
    });
  }

  alta() {

    if (this.myForm.controls['_id'].value) {
      // se modifica
      this.ventasService.update(this.myForm.controls['_id'].value, this.myForm.value).subscribe((data) => {
        this.resetForm();
        M.toast({ html: 'Se modifico correctamente', classes: 'rounded' });
      });
    }
    // sino agrega uno nuevo
    else {
      this.ventasService.create(this.myForm.value).subscribe((data) => {
        this.resetForm();
        M.toast({ html: 'Se agrego correctamente', classes: 'rounded' });
      });
    }
  }

  modificar(venta: Venta) {
    this.ventasService.selectedVenta = venta;
    this.myForm = this.fb.group({
      _id: [venta._id],
      fecha: [venta.fecha],
      usuario: [venta.usuario._id],
      productos: [venta.productos._id],
      total: [venta.total],
      estado: [venta.estado],
    });
    this.claseLabel="active";
  }

  borrar(id) {
    if (confirm('Estas seguro de querer borrarlo?')) {
      this.ventasService.delete(id).subscribe(() => {
        this.traerVentas();
        M.toast({ html: 'Se borro correctamente', classes: 'rounded' });
      });
    }
  }

  resetForm() {
    this.claseLabel="";
    this.prepareForm();
    this.traerVentas();
  }

  setPage(pageInfo){
    this.ventasService.getVentas(pageInfo).subscribe( (data) =>{
      this.ventas= data['docs'] as Venta[];
      this.datos = data as Dato;
      this.datos.page = pageInfo["offset"];
    })
  }


}/*clase ventas*/
