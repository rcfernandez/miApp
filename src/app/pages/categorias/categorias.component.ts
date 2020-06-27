import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Categoria } from '../../models/categoria.model';

declare var M;

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[];
  myForm: FormGroup;
  claseLabel = "";

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
      this.categorias = data as Categoria[];
    });
  }

  alta() {
    if(this.myForm.controls["_id"].value){
      // se modifica
      this.categoriasService.modificarCategoria(this.myForm.controls["_id"].value, this.myForm.value).subscribe((data) => {
        this.resetForm();
        M.toast({html: 'Se modifico correctamente', classes: 'rounded'});
      });
    }
    // sino agrega uno nuevo
    else{
      this.categoriasService.altaCategoria(this.myForm.value).subscribe((data) => {
        this.resetForm();
        M.toast({html: 'Se agrego correctamente', classes: 'rounded'});
      });
      
    }
  }

  modificar(categoria: Categoria) {
    this.categoriasService.selectedCategoria = categoria;
    this.myForm = this.fb.group({
      _id: [categoria._id],
      descripcion: [categoria.descripcion, Validators.required],
    });
    this.claseLabel="active";
  }

  borrar(id) {
     if(confirm("Estas seguro de querer borrarlo?")){
       this.categoriasService.borrarCategoria(id).subscribe(() => {
         this.traerCategorias();
         M.toast({html: 'Se borro correctamente', classes: 'rounded'});
       });
     }
  }

  resetForm() {
    this.myForm.reset();
    this.claseLabel="";
    this.traerCategorias();
    M.updateTextFields();
  }


} /*clase categorias*/
