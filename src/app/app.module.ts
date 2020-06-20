import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // *2 hay que agregarlo para que funcione el 'ngModel'
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableListComponent } from './components/table-list/table-list.component';
import { TituloComponent } from './components/titulo/titulo.component';

import { HomeComponent } from './pages/home/home.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    NavbarComponent,
    UsuarioComponent,
    ProductosComponent,
    CategoriasComponent,
    TableListComponent,
    TituloComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // *2 hay que agregarlo para que funcione el 'ngModel'
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent, // este es el default
    // PruebaComponent, // *1 para que empiece con este modulo
  ],
})
export class AppModule {}
