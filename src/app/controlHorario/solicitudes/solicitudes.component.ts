import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import {
  allTipoSolicitud,
  allUsuarios,
  allUsuariosOrganizacion,
  altaSolicitud,
  listSolicitud,
  updateSolicitud,
} from '../../actions';
import { AppState } from '../../app.reducer';
import { GlobalFunctions } from '../../globals/global-functions';
import { MaterialModules } from '../../modules/material.modules';
import { OtherModule } from '../../modules/other.modules';
import { PrimeNgModules } from '../../modules/primeng.modules';
import { SolicitudDTO } from '../../modulesDTO/solicitud.dto';
import { TipoSolicitudDTO } from '../../modulesDTO/tipoSolicitud.dto';
import { UsuariosDTO } from '../../modulesDTO/usuaios.dto';
import { RechazadasComponent } from './rechazadas/rechazadas.component';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [CommonModule, OtherModule, MaterialModules, PrimeNgModules],
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.scss',
  providers: [MessageService],
})
export class SolicitudesComponent implements OnInit, OnDestroy {
  fechaSolicitud: UntypedFormControl;
  tpSolicitud: UntypedFormControl;
  txtSolicitud: UntypedFormControl;
  usuarioSolicitud: UntypedFormControl;

  formulario: UntypedFormGroup;

  tipoSolicitud: TipoSolicitudDTO[] = [];
  usuarios: UsuariosDTO[] = [];
  solicitudes: SolicitudDTO[] = [];

  conection: any;
  org: any;
  rol: any;
  activar: boolean = true;
  idUser: string = '';

  suscripcion: Subscription = new Subscription();

  constructor(
    private translate: TranslateService,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private messageService: MessageService,
    private dialog: MatDialog
  ) {
    this.fechaSolicitud = new UntypedFormControl(null, [Validators.required]);
    this.tpSolicitud = new UntypedFormControl(null, [Validators.required]);
    this.txtSolicitud = new UntypedFormControl(null, [
      Validators.required,
      Validators.maxLength(100),
    ]);
    this.usuarioSolicitud = new UntypedFormControl(null, [Validators.required]);

    this.formulario = this.fb.group({
      fechaSolicitud: this.fechaSolicitud,
      tpSolicitud: this.tpSolicitud,
      txtSolicitud: this.txtSolicitud,
      usuarioSolicitud: this.usuarioSolicitud,
    });
  }
  ngOnInit(): void {
    let user = JSON.parse(sessionStorage.getItem('user') ?? '');
    this.conection = user.organizaciones[0].conection;
    this.org = user.organizaciones;
    this.rol = user.roles;
    this.idUser = user.email;

    setTimeout(() => {
      this.loadTiposSolicitud();
      setTimeout(() => {
        if (this.org.length === 0) {
          this.loadUsuarios();
        } else {
          this.loadUsuariosOrganizacion(this.org[0].id);
        }
        setTimeout(() => {
          if (this.rol.length !== 0) {
            const usuarioSolicitudControl =
              this.formulario.get('usuarioSolicitud');
            if (this.rol[0].id === 1) {
              usuarioSolicitudControl?.enable();
              this.activar = true;
            } else {
              this.activar = false;
              usuarioSolicitudControl?.disable();
            }

            let userAux = this.usuarios.filter(
              (usr) => usr.email === this.idUser
            )[0];
            this.usuarioSolicitud.setValue(userAux.email);
          }
          setTimeout(() => {
            this.loadSolicitudes();
          }, 200);
        }, 200);
      }, 300);
    }, 300);
  }

  ngOnDestroy(): void {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }
  }

  loadTiposSolicitud() {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }

    let valores = {
      nombreConexion: this.conection,
    };

    this.store.dispatch(allTipoSolicitud({ conexion: valores }));

    this.suscripcion = this.store
      .select('tipoSolicitudApp')
      .subscribe((resultado) => {
        if (resultado.error == undefined && resultado.loading === false) {
          this.tipoSolicitud = [...resultado.tipoSolicitudes];
          /*
          if (this.activos === false) {
            this.usuarios = this.usuarios.filter((usr) => usr.activate == true);
          }
          */
        }
      });
  }

  loadUsuarios() {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }

    this.store.dispatch(allUsuarios());

    this.suscripcion = this.store
      .select('usuariosApp')
      .subscribe((resultado) => {
        if (resultado.error == undefined && resultado.loading === false) {
          this.usuarios = [...resultado.usuarios];

          this.usuarios = this.usuarios.filter((usr) => usr.activate == true);
        }
      });
  }

  loadUsuariosOrganizacion(id: number) {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }
    let valores = {
      id: id,
    };

    this.store.dispatch(allUsuariosOrganizacion({ usuario: valores }));

    this.suscripcion = this.store
      .select('usuariosApp')
      .subscribe((resultado) => {
        if (resultado.error == undefined && resultado.loading == false) {
          this.usuarios = [...resultado.usuarios];

          this.usuarios = this.usuarios.filter((usr) => usr.activate == true);
        }
      });
  }

  agregarCeroDelante(numero: number): string {
    return numero < 10 ? '0' + numero : '' + numero;
  }

  save() {
    const fechaActual: Date = new Date();
    const horas = this.agregarCeroDelante(fechaActual.getHours());
    const minutos = this.agregarCeroDelante(fechaActual.getMinutes());
    const segundos = this.agregarCeroDelante(fechaActual.getSeconds());
    let horaActual = `${horas}:${minutos}:${segundos}`;

    const fechaAuxiliar = this.formatDate(fechaActual) + ' ' + horaActual;

    const inicioAux = this.fechaSolicitud.value[0];
    const finAux = this.fechaSolicitud.value[1];

    let valores = {
      nombreConexion: this.conection,
      user_id: this.usuarioSolicitud.value,
      tipo_solicitud: this.tpSolicitud.value,
      texto_solicitud: this.txtSolicitud.value,
      fecha_solicitud: fechaAuxiliar,
      fecha_inicio: this.formatDate(inicioAux),
      fecha_fin: this.formatDate(finAux),
    };

    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }

    this.store.dispatch(altaSolicitud({ solicitud: valores }));

    this.suscripcion = this.store
      .select('solicitudesApp')
      .subscribe((resultado) => {
        if (resultado.error == undefined && resultado.loading == false) {
          this.loadSolicitudes();
        }
      });
  }

  formatDate(date: Date): string {
    const yy = date.getFullYear().toString().slice(-2);
    const mm = ('0' + (date.getMonth() + 1)).slice(-2);
    const dd = ('0' + date.getDate()).slice(-2);

    return `${yy}-${mm}-${dd}`;
  }

  loadSolicitudes() {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }

    let valores = {
      nombreConexion: this.conection,
      user_id: this.usuarioSolicitud.value,
    };

    this.store.dispatch(listSolicitud({ solicitud: valores }));

    this.suscripcion = this.store
      .select('solicitudesApp')
      .subscribe((resultado) => {
        console.log(resultado);
        if (resultado.error == undefined && resultado.loading == false) {
          this.solicitudes = [...resultado.solicitudes];
        }
      });
  }

  obtenerTipoSolicitud(id: number) {
    const item = this.tipoSolicitud.find((ts) => ts.id == id);
    return item ? item.description : '***';
  }

  getStatus(aceptada: boolean, rechazada: boolean) {
    if (aceptada == false && rechazada == false) {
      return 'info';
    }
    if (aceptada == true) {
      return 'success';
    }
    if (rechazada == true) {
      return 'danger';
    }
    return 'danger';
  }

  getStatusText(aceptada: boolean, rechazada: boolean) {
    if (aceptada == false && rechazada == false) {
      return 'solicitud.pendiente';
    }
    if (aceptada == true) {
      return 'solicitud.aceptada';
    }
    if (rechazada == true) {
      return 'solicitud.rechazada';
    }
    return '';
  }

  solicitudAceptarId(id: number) {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }
    let valores = {
      nombreConexion: this.conection,
      tipo_update: 'A',
      fecha_aceptada: GlobalFunctions.formatDate(new Date()),
      aceptada: true,
    };

    this.store.dispatch(updateSolicitud({ solicitud: valores, id: id }));

    this.suscripcion = this.store
      .select('solicitudesApp')
      .subscribe((resultado) => {
        if (resultado.error == undefined && resultado.loading == false) {
          this.loadSolicitudes();
        }
      });
  }

  solicitudRechazarId(id: number) {
    const dialogRef = this.dialog.open(RechazadasComponent, {
      data: { data: id },
      height: '25vh',
      width: '45vh',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result != undefined) {
        let valores = {
          nombreConexion: this.conection,
          tipo_update: 'R',
          fecha_rechazada: GlobalFunctions.formatDate(new Date()),
          rechazada: true,
          motivo_rechazo: result.motivo,
        };

        this.store.dispatch(updateSolicitud({ solicitud: valores, id: id }));

        this.suscripcion = this.store
          .select('solicitudesApp')
          .subscribe((resultado) => {
            if (resultado.error == undefined && resultado.loading == false) {
              this.loadSolicitudes();
            }
          });
      }
    });
  }
}
