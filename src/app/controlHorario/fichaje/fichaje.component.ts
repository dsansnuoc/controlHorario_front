import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModules } from '../../modules/material.modules';
import { OtherModule } from '../../modules/other.modules';
import { PrimeNgModules } from '../../modules/primeng.modules';

@Component({
  selector: 'app-fichaje',
  standalone: true,
  imports: [CommonModule, OtherModule, MaterialModules, PrimeNgModules],
  templateUrl: './fichaje.component.html',
  styleUrl: './fichaje.component.scss',
})
export class FichajeComponent implements OnInit {
  horaActual: string = '';

  entrada: boolean = false;
  pausa: boolean = true;
  salida: boolean = false;

  horaEntrada: string = '';
  totalTiempo: string = '';
  horaSalida: string = '';

  ngOnInit(): void {
    this.actualizarHora();

    setInterval(() => {
      this.actualizarHora();
    }, 1000);
  }

  actualizarHora(): void {
    const fechaActual = new Date();
    const horas = this.agregarCeroDelante(fechaActual.getHours());
    const minutos = this.agregarCeroDelante(fechaActual.getMinutes());
    const segundos = this.agregarCeroDelante(fechaActual.getSeconds());
    this.horaActual = `${horas}:${minutos}:${segundos}`;
  }

  agregarCeroDelante(numero: number): string {
    return numero < 10 ? '0' + numero : '' + numero;
  }

  clickEntrada() {
    this.horaEntrada = this.horaActual;
    this.horaSalida = '';
    this.totalTiempo = '';
    this.entrada = true;
    this.salida = false;
  }

  clickSalida() {
    this.entrada = false;
    this.salida = true;
    this.horaSalida = this.horaActual;
    this.totalTiempo = this.restarHoras(this.horaActual, this.horaEntrada);
  }

  restarHoras(hora1: string, hora2: string): string {
    const [h1, m1, s1] = hora1.split(':').map(Number);
    const [h2, m2, s2] = hora2.split(':').map(Number);

    let segundos = (h1 - h2) * 3600 + (m1 - m2) * 60 + (s1 - s2);
    const signo = segundos < 0 ? '-' : '+';
    segundos = Math.abs(segundos);

    const horas = Math.floor(segundos / 3600);
    segundos %= 3600;
    const minutos = Math.floor(segundos / 60);
    segundos %= 60;

    return `${signo}${this.agregarCeroDelante(horas)}:${this.agregarCeroDelante(
      minutos
    )}:${this.agregarCeroDelante(segundos)}`;
  }

  clickPausa() {}
}
