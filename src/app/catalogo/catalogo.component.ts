import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
})
export class CatalogoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  productos = [
    {
      id: 1,
      descripcion: 'Moto G9',
      precio: 35000,
    },
    {
      id: 2,
      descripcion: 'iPhone X',
      precio: 50000,
    },
    {
      id: 3,
      descripcion: 'Samsung S20',
      precio: 45000,
    },
  ];
}
