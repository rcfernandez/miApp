import { Component, OnInit, Input } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { Usuario } from '../models/usuario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var Materialize;

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {

  usuarios;
  myForm: FormGroup;

  constructor(
    public usuariosService: UsuariosService,
    private fb: FormBuilder,
    ) {
      this.myForm = fb.group({
        _id: [''],
        usuario: ['',[Validators.required]],
        nombre: ['',[Validators.required]],
        apellido: [''],
        telefono: [''],
        email: ['', Validators.email],
        password: [''],
      });
    }

  ngOnInit(): void {
    this.traerUsuarios();
  }

  traerUsuarios() {
    this.usuariosService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  alta() {
    if(this.myForm.controls["_id"].value){
      // se modifica
      this.usuariosService.modificarUsuario(this.myForm.controls["_id"].value, this.myForm.value).subscribe((data) => {
        this.myForm.reset();
        this.traerUsuarios();
        Materialize.toast('Se modifico correctamente', 4000, 'rounded')
      });
    }
    // sino agrega uno nuevo
    else{
      this.usuariosService.altaUsuario(this.myForm.value).subscribe((data) => {
        this.myForm.reset();
        this.traerUsuarios();
        Materialize.toast('Se agrego correctamente', 4000, 'rounded')
      });
      
    }
  }

  modificar(usuario: Usuario) {
    this.usuariosService.selectedUsuario = usuario;
  }

  borrar(id) {
    if(confirm("Estas seguro de querer borrarlo?")){
      this.usuariosService.borrarUsuario(id).subscribe(() => {
        this.traerUsuarios();
        Materialize.toast('Se borro correctamente', 4000, 'rounded')
      });
    }
  }

  resetForm() {
    this.myForm.reset();
    this.traerUsuarios();
  }

  
} /*clase Usuario*/
