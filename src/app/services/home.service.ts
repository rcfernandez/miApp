import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor() {}

  getProductos() {
    return [
      {
        id: 1,
        nombre: 'Moto Z Play',
      },
      {
        id: 2,
        nombre: 'Samsung S30',
      },
    ];
  }
}
