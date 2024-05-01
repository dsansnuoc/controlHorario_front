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
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import {
  addTipoSolicitud,
  loadTipoSolicitud,
  updateTipoSolicitud,
} from '../../../../actions';
import { AppState } from '../../../../app.reducer';
import { MaterialModules } from '../../../../modules/material.modules';
import { OtherModule } from '../../../../modules/other.modules';
import { PrimeNgModules } from '../../../../modules/primeng.modules';

@Component({
  selector: 'app-tipos-solicitudes',
  standalone: true,
  imports: [CommonModule, OtherModule, MaterialModules, PrimeNgModules],
  templateUrl: './tipos-solicitudes.component.html',
  styleUrl: './tipos-solicitudes.component.scss',
  providers: [MessageService],
})
export class TiposSolicitudesComponent implements OnInit {
  id: number = 0;

  descripcion: UntypedFormControl;

  formulario: UntypedFormGroup;

  suscripcion: Subscription = new Subscription();

  conection: any;

  constructor(
    private translate: TranslateService,
    public dialogRef: MatDialogRef<TiposSolicitudesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private messageService: MessageService
  ) {
    this.descripcion = new UntypedFormControl(null, [Validators.required]);

    this.formulario = this.fb.group({
      descripcion: this.descripcion,
    });
  }

  ngOnInit(): void {
    let user = JSON.parse(sessionStorage.getItem('user') ?? '');
    this.conection = user.organizaciones[0].conection;

    this.id = this.data.data.id;
    if (this.id !== 0) {
      this.loadTipoSolicitud(this.id);
    }
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onYesClick(): void {
    this.dialogRef.close('Ok');
  }

  save() {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }

    let valores = {
      nombreConexion: this.conection,
      description: this.descripcion.value,
    };

    if (this.id === 0) {
      this.store.dispatch(addTipoSolicitud({ tipoSoliciud: valores }));
    } else {
      this.store.dispatch(
        updateTipoSolicitud({ tipoSoliciud: valores, id: this.id })
      );
    }

    this.suscripcion = this.store
      .select('tipoSolicitudApp')
      .subscribe((resultado) => {
        if (resultado.error == undefined && resultado.loading == false) {
          this.messageService.add({
            severity: 'info',
            summary: 'Life',
            detail: this.translate.instant('error.ok'), //this.translate.instant('error.login'),
          });
          setTimeout(() => {
            this.onYesClick();
          }, 1000);
        } else {
          if (
            resultado.loading == false &&
            resultado.loaded == true &&
            resultado.error != undefined
          ) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: this.translate.instant('general.error'),
            });
          }
        }
      });
  }

  loadTipoSolicitud(id: number) {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }

    var valores = { nombreConexion: this.conection, id: id };

    this.store.dispatch(loadTipoSolicitud({ tipoSoliciud: valores }));

    this.suscripcion = this.store
      .select('tipoSolicitudApp')
      .subscribe((resultado) => {
        if (resultado.error == undefined && resultado.loading == false) {
          console.log(resultado.tipoSolicitud?.description);

          this.descripcion.setValue(resultado.tipoSolicitud?.description);
        }
      });
  }
}
