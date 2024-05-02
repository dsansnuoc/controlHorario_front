import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import {
  allTipoPausa,
  altaFichajeUsuario,
  getUltimoFichajeUsuario,
} from '../../actions';
import { AppState } from '../../app.reducer';
import { MaterialModules } from '../../modules/material.modules';
import { OtherModule } from '../../modules/other.modules';
import { PrimeNgModules } from '../../modules/primeng.modules';
import { TipoPausasDTO } from '../../modulesDTO/tipoPausas.dto';

@Component({
  selector: 'app-fichaje',
  standalone: true,
  imports: [CommonModule, OtherModule, MaterialModules, PrimeNgModules],
  templateUrl: './fichaje.component.html',
  styleUrl: './fichaje.component.scss',
  providers: [MessageService],
})
export class FichajeComponent implements OnInit {
  horaActual: string = '';

  entrada: boolean = false;
  pausa: boolean = false;
  rpausa: boolean = false;
  salida: boolean = false;

  horaEntrada: string = '';
  totalTiempo: string = '';
  horaSalida: string = '';

  suscripcion: Subscription = new Subscription();

  tiposPausas: TipoPausasDTO[] = [];
  tipoPausa: TipoPausasDTO | undefined;

  conection: any;

  constructor(
    private translate: TranslateService,
    // public dialogRef: MatDialogRef<TiposSolicitudesComponent>,
    //  @Inject(MAT_DIALOG_DATA) public data: any,
    // private fb: FormBuilder,
    private store: Store<AppState>,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    let user = JSON.parse(sessionStorage.getItem('user') ?? '');
    this.conection = user.organizaciones[0].conection;

    this.actualizarHora();
    setInterval(() => {
      this.actualizarHora();
    }, 1000);

    this.loadFichajeUsuario();
    setTimeout(() => {
      this.loadTiposParada();
    }, 500);
  }

  loadTiposParada() {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }

    let valores = {
      nombreConexion: this.conection,
    };

    this.store.dispatch(allTipoPausa({ conexion: valores }));

    this.suscripcion = this.store
      .select('tipoPausasApp')
      .subscribe((resultado) => {
        if (resultado.error == undefined && resultado.loading === false) {
          this.tiposPausas = [...resultado.tipoPausas];
          /*
          if (this.activos === false) {
            this.usuarios = this.usuarios.filter((usr) => usr.activate == true);
          }
          */
        }
      });
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
    this.pausa = true;
    this.rpausa = true;
    this.entradaFichaje();
  }

  clickSalida() {
    this.entrada = false;
    this.salida = true;
    this.pausa = false;
    this.rpausa = false;
    this.horaSalida = this.horaActual;
    this.totalTiempo = this.restarHoras(this.horaActual, this.horaEntrada);
    this.salidaFichaje();
  }

  clickInicioPausa() {
    this.pausa = false;
    this.rpausa = true;
    this.salida = true;
    this.pausaFichajeInicio();
  }

  clickIFinPausa() {
    this.pausa = true;
    this.rpausa = false;
    this.salida = false;
    this.pausaFichajeFin();
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

  loadFichajeUsuario() {
    let user = JSON.parse(sessionStorage.getItem('user') ?? '');
    let valores = {
      nombreConexion: this.conection,
      id: user.email,
    };

    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }

    this.store.dispatch(getUltimoFichajeUsuario({ conexion: valores }));

    this.suscripcion = this.store
      .select('fichajeApp')
      .subscribe((resultado) => {
        if (resultado.error == undefined && resultado.loading == false) {
          console.log(resultado.fichaje?.tipo_fichaje);

          if (resultado.fichaje?.hora_fichaje == undefined) {
          } else {
            console.log(resultado.fichaje.tipo_fichaje);
            if (resultado.fichaje.tipo_fichaje == '1') {
              this.entrada = true;
              this.salida = false;
              this.pausa = true;
              this.rpausa = false;
              this.horaEntrada = resultado.fichaje.hora_fichaje
                .toString()
                .split(' ')[1];
            }

            if (resultado.fichaje.tipo_fichaje == '21') {
              this.entrada = true;
              this.salida = false;
              this.pausa = true;
              this.rpausa = false;
              this.horaEntrada = resultado.fichaje.hora_fichaje
                .toString()
                .split(' ')[1];
            }

            if (resultado.fichaje.tipo_fichaje == '11') {
              this.entrada = true;
              this.salida = false;
              this.pausa = false;
              this.rpausa = true;
              this.horaEntrada = resultado.fichaje.hora_fichaje
                .toString()
                .split(' ')[1];
            }
          }
        }
      });
  }

  entradaFichaje() {
    let fecha: Date = new Date();
    const year = fecha.getFullYear();
    const month = ('0' + (fecha.getMonth() + 1)).slice(-2); // Se suma 1 porque los meses comienzan en 0
    const day = ('0' + fecha.getDate()).slice(-2);

    let fechaAuxiliar = year + '-' + month + '-' + day + ' ' + this.horaEntrada;

    let user = JSON.parse(sessionStorage.getItem('user') ?? '');
    let valores = {
      nombreConexion: this.conection,
      id: user.email,
      hora_fichaje: fechaAuxiliar,
      tipo_fichaje: '1',
      tipo_pausa: '',
    };

    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }

    this.store.dispatch(altaFichajeUsuario({ conexion: valores }));

    this.suscripcion = this.store
      .select('fichajeApp')
      .subscribe((resultado) => {
        if (resultado.error == undefined && resultado.loading == false) {
          if (resultado.fichaje?.hora_fichaje == undefined) {
          }
        }
      });
  }

  salidaFichaje() {
    let fecha: Date = new Date();
    const year = fecha.getFullYear();
    const month = ('0' + (fecha.getMonth() + 1)).slice(-2); // Se suma 1 porque los meses comienzan en 0
    const day = ('0' + fecha.getDate()).slice(-2);

    let fechaAuxiliar = year + '-' + month + '-' + day + ' ' + this.horaSalida;

    let user = JSON.parse(sessionStorage.getItem('user') ?? '');
    let valores = {
      nombreConexion: this.conection,
      id: user.email,
      hora_fichaje: fechaAuxiliar,
      tipo_fichaje: '2',
      tipo_pausa: '',
    };

    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }

    this.store.dispatch(altaFichajeUsuario({ conexion: valores }));

    this.suscripcion = this.store
      .select('fichajeApp')
      .subscribe((resultado) => {
        if (resultado.error == undefined && resultado.loading == false) {
          if (resultado.fichaje?.hora_fichaje == undefined) {
          }
        }
      });
  }

  pausaFichajeInicio() {
    let fecha: Date = new Date();
    const year = fecha.getFullYear();
    const month = ('0' + (fecha.getMonth() + 1)).slice(-2); // Se suma 1 porque los meses comienzan en 0
    const day = ('0' + fecha.getDate()).slice(-2);

    let fechaAuxiliar = year + '-' + month + '-' + day + ' ' + this.horaActual;

    let user = JSON.parse(sessionStorage.getItem('user') ?? '');
    let valores = {
      nombreConexion: this.conection,
      id: user.email,
      hora_fichaje: fechaAuxiliar,
      tipo_fichaje: '11',
      tipo_pausa: this.tipoPausa?.id,
    };

    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }

    this.store.dispatch(altaFichajeUsuario({ conexion: valores }));

    this.suscripcion = this.store
      .select('fichajeApp')
      .subscribe((resultado) => {
        if (resultado.error == undefined && resultado.loading == false) {
          if (resultado.fichaje?.hora_fichaje == undefined) {
          }
        }
      });
  }

  pausaFichajeFin() {
    let fecha: Date = new Date();
    const year = fecha.getFullYear();
    const month = ('0' + (fecha.getMonth() + 1)).slice(-2); // Se suma 1 porque los meses comienzan en 0
    const day = ('0' + fecha.getDate()).slice(-2);

    let fechaAuxiliar = year + '-' + month + '-' + day + ' ' + this.horaActual;

    let user = JSON.parse(sessionStorage.getItem('user') ?? '');
    let valores = {
      nombreConexion: this.conection,
      id: user.email,
      hora_fichaje: fechaAuxiliar,
      tipo_fichaje: '21',
      tipo_pausa: '',
    };

    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }

    this.store.dispatch(altaFichajeUsuario({ conexion: valores }));

    this.suscripcion = this.store
      .select('fichajeApp')
      .subscribe((resultado) => {
        if (resultado.error == undefined && resultado.loading == false) {
          if (resultado.fichaje?.hora_fichaje == undefined) {
          }
        }
      });
  }
}
