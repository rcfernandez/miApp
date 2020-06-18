import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // *2 hay que agregarlo para que funcione el 'ngModel'
import { HomeComponent } from './home/home.component';
import { ContactoComponent } from './contacto/contacto.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HttpClientModule } from "@angular/common/http";
import { UsuarioComponent } from './usuario/usuario.component';

import { ProductosComponent } from './productos/productos.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriasComponent } from './categorias/categorias.component';
import { TableListComponent } from './components/table-list/table-list.component';
import { TituloComponent } from './components/titulo/titulo.component';


@NgModule({
  declarations: [
    AppComponent,
    CalculadoraComponent,
    HomeComponent,
    ContactoComponent,
    LoginComponent,
    RegistroComponent,
    CatalogoComponent,
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
