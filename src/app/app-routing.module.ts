import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactoComponent } from './contacto/contacto.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { ProductosComponent } from './productos/productos.component';
import { CategoriasComponent } from './categorias/categorias.component';

import { TableListComponent } from './components/table-list/table-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'calculadora', component: CalculadoraComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'usuarios', component: UsuarioComponent },
  { path: 'administracion', component: AdministracionComponent },
  { path: 'productos', component: ProductosComponent },  
  { path: 'categorias', component: CategoriasComponent },
  { path: 'table-list', component: TableListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
