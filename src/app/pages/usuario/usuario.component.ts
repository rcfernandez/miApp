import { Component, OnInit, Input } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var M;

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[];
  myForm: FormGroup;
  claseLabel = "";

  constructor(
    public usuariosService: UsuariosService,
    private fb: FormBuilder,
    ) {
      this.prepareForm();
    }

  ngOnInit(): void {
    this.traerUsuarios();
  }

  prepareForm(){
    this.myForm = this.fb.group({
      _id: [''],
      usuario: ['',[Validators.required]],
      nombre: ['',[Validators.required]],
      apellido: [''],
      telefono: [''],
      email: ['', Validators.email],
      password: [''],
    });
  }

  traerUsuarios() {
    this.usuariosService.getUsuarios().subscribe((data) => {
      this.usuarios = data as Usuario[];
    });
  }

  alta() {
    if(this.myForm.controls["_id"].value){
      // se modifica
      this.usuariosService.modificarUsuario(this.myForm.controls["_id"].value, this.myForm.value).subscribe((data) => {
        this.resetForm();
        M.toast({html: 'Se modifico correctamente', classes: 'rounded'});
      });
    }
    // sino agrega uno nuevo
    else{
      this.usuariosService.altaUsuario(this.myForm.value).subscribe((data) => {
        this.resetForm();
        M.toast({html: 'Se agrego correctamente', classes: 'rounded'});
      });
      
      this.myForm.reset();
    }
  }

  modificar(usuario: Usuario) {
    this.usuariosService.selectedUsuario = usuario;
    this.myForm = this.fb.group({
      _id: [usuario._id],
      usuario: [usuario.usuario,[Validators.required]],
      nombre: [usuario.nombre,[Validators.required]],
      apellido: [usuario.apellido],
      telefono: [usuario.telefono],
      email: [usuario.email, Validators.email],
      password: [usuario.password],
    });
    this.claseLabel="active";
  }

  borrar(id) {
    if(confirm("Estas seguro de querer borrarlo?")){
      this.usuariosService.borrarUsuario(id).subscribe(() => {
        this.traerUsuarios();
        M.toast({html: 'Se borro correctamente', classes: 'rounded'});
      });
    }
  }

  resetForm() {
    this.claseLabel="";
    this.prepareForm();
    this.traerUsuarios();
  }

  
} /*clase Usuario*/
