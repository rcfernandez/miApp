import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../services/categorias.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Categoria } from '../models/categoria.model';

declare var Materialize;

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  categorias;
  myForm: FormGroup;

  constructor(
    public categoriasService: CategoriasService,
    private fb: FormBuilder,
  ) {
    //validaciones campos form
    this.myForm = this.fb.group({
      _id: [''],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.traerCategorias();
  }

  traerCategorias() {
    this.categoriasService.getCategorias().subscribe((data) => {
      this.categorias = data;
      console.log(data);
    });
  }

  alta() {
    if(this.myForm.controls["_id"].value){
      // se modifica
      this.categoriasService.modificarCategoria(this.myForm.controls["_id"].value, this.myForm.value).subscribe((data) => {
        this.myForm.reset();
        this.traerCategorias();
        Materialize.toast('Se modifico correctamente', 4000, 'rounded')
      });
    }
    // sino agrega uno nuevo
    else{
      this.categoriasService.altaCategoria(this.myForm.value).subscribe((data) => {
        this.myForm.reset();
        this.traerCategorias();
        Materialize.toast('Se agrego correctamente', 4000, 'rounded')
      });
      
    }
  }

  modificar(categoria: Categoria) {
    this.categoriasService.selectedCategoria = categoria;
  }

  borrar(id) {
     if(confirm("Estas seguro de querer borrarlo?")){
       this.categoriasService.borrarCategoria(id).subscribe(() => {
         this.traerCategorias();
         Materialize.toast('Se borro correctamente', 4000, 'rounded')
       });
     }
  }

  resetForm() {
    this.myForm.reset();
    this.traerCategorias();
  }
}
