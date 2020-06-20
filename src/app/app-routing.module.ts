import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';

import { TableListComponent } from './components/table-list/table-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'usuarios', component: UsuarioComponent },
  { path: 'productos', component: ProductosComponent },  
  { path: 'categorias', component: CategoriasComponent },
  { path: 'table-list', component: TableListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
