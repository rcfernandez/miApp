import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css'],
})
export class CalculadoraComponent implements OnInit {
  valor1: number = 0;
  valor2: number = 0;
  resultado: number = 0;

  constructor() {}

  ngOnInit(): void {}

  sumar() {
    this.resultado = this.valor1 * 1 + this.valor2 * 1;
  }

  restar() {
    this.resultado = this.valor1 - this.valor2;
  }

  multiplicar() {
    this.resultado = this.valor1 * this.valor2;
  }

  dividir() {
    this.resultado = this.valor1 / this.valor2;
  }
}
