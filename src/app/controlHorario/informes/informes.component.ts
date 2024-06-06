import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  allUsuarios,
  allUsuariosOrganizacion,
  downloadFile,
  downloadFileCsv,
  downloadFilePdf,
} from '../../actions';
import { AppState } from '../../app.reducer';
import { MaterialModules } from '../../modules/material.modules';
import { OtherModule } from '../../modules/other.modules';
import { PrimeNgModules } from '../../modules/primeng.modules';
import { UsuariosDTO } from '../../modulesDTO/usuaios.dto';
import { RechazadasComponent } from '../solicitudes/rechazadas/rechazadas.component';

@Component({
  selector: 'app-informes',
  standalone: true,
  imports: [CommonModule, OtherModule, MaterialModules, PrimeNgModules],
  templateUrl: './informes.component.html',
  styleUrl: './informes.component.scss',
})
export class InformesComponent implements OnInit {
  fechaDesde: UntypedFormControl;
  fechaHasta: UntypedFormControl;
  usuarioSolicitud: UntypedFormControl;

  formulario: UntypedFormGroup;

  conection: any;
  org: any;
  rol: any;
  activar: boolean = true;
  idUser: string = '';

  usuarios: UsuariosDTO[] = [];

  suscripcion: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<RechazadasComponent>,
    @Inject(MAT_DIALOG_DATA) public tipo: any,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.fechaDesde = new UntypedFormControl(new Date(), [Validators.required]);
    this.fechaHasta = new UntypedFormControl(new Date(), [Validators.required]);
    this.usuarioSolicitud = new UntypedFormControl(null, [Validators.required]);

    this.formulario = this.fb.group({
      fechaDesde: this.fechaDesde,
      fechaHasta: this.fechaHasta,
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
      }, 200);
    }, 300);
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

  save() {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }

    const fd = this.fechaDesde.value;
    const fh = this.fechaHasta.value;
    const usr = this.usuarioSolicitud.value;

    let valores = {
      userid: usr,
      nombreConexion: this.conection,
      fInicial: this.formatDate(this.fechaDesde.value),
      fFinal: this.formatDate(this.fechaHasta.value),
    };

    switch (this.tipo.data) {
      case 'xlsx':
        this.store.dispatch(downloadFile({ conexion: valores }));

        this.suscripcion = this.store
          .select('exportApp')
          .subscribe((response) => {
            if (response.error == undefined) {
              if (response.fichero != null) {
                const blob = new Blob([response.fichero], {
                  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                });
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(response.fichero);
                link.download = 'fichaje.xlsx';
                link.click();
                this.onNoClick();
              }
            }
          });
        break;

      case 'pdf':
        this.store.dispatch(downloadFilePdf({ conexion: valores }));

        this.suscripcion = this.store
          .select('exportApp')
          .subscribe((response) => {
            if (response.error == undefined) {
              if (response.fichero != null) {
                const blob = new Blob([response.fichero], {
                  type: 'application/pdf',
                });
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(response.fichero);
                link.download = 'fichaje.pdf';
                link.click();
                this.onNoClick();
              }
            }
          });
        break;

      case 'csv':
        this.store.dispatch(downloadFileCsv({ conexion: valores }));

        this.suscripcion = this.store
          .select('exportApp')
          .subscribe((response) => {
            if (response.error == undefined) {
              if (response.fichero != null) {
                const blob = new Blob([response.fichero], {
                  type: 'text/csv',
                });
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(response.fichero);
                link.download = 'fichaje.pdf';
                link.click();
                this.onNoClick();
              }
            }
          });
        break;
    }
  }

  formatDate(date: Date): string {
    const yy = date.getFullYear().toString().slice(-2);
    const mm = ('0' + (date.getMonth() + 1)).slice(-2);
    const dd = ('0' + date.getDate()).slice(-2);

    return `${yy}-${mm}-${dd}`;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
