import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import {
  FormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import {
  addOrganizacion,
  loadOrganizacion,
  updateOrganizacion,
} from '../../../../actions';
import { AppState } from '../../../../app.reducer';
import { GlobalConstants } from '../../../../globals/global-constants';
import { MaterialModules } from '../../../../modules/material.modules';
import { OtherModule } from '../../../../modules/other.modules';
import { PrimeNgModules } from '../../../../modules/primeng.modules';

@Component({
  selector: 'app-organizaciones',
  standalone: true,
  imports: [CommonModule, OtherModule, MaterialModules, PrimeNgModules],
  templateUrl: './organizaciones.component.html',
  styleUrl: './organizaciones.component.scss',
  providers: [MessageService],
})
export class OrganizacionesComponent implements OnInit {
  id: number = 0;

  emailRegex = GlobalConstants.emailRegex;

  name: UntypedFormControl;
  nif: UntypedFormControl;
  email: UntypedFormControl;
  conection: UntypedFormControl;
  smtpPort: UntypedFormControl;
  smtpUser: UntypedFormControl;
  smtpPassword: UntypedFormControl;
  smtpServer: UntypedFormControl;
  activate: UntypedFormControl;

  formulario: UntypedFormGroup;

  suscripcion: Subscription = new Subscription();

  constructor(
    private translate: TranslateService,
    public dialogRef: MatDialogRef<OrganizacionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private messageService: MessageService
  ) {
    this.name = new UntypedFormControl(null, [Validators.required]);
    this.nif = new UntypedFormControl(null, [Validators.required]);
    this.email = new UntypedFormControl(null, [
      Validators.required,
      Validators.pattern(this.emailRegex),
    ]);
    this.conection = new UntypedFormControl(null, [Validators.required]);
    this.smtpPort = new UntypedFormControl('');
    this.smtpUser = new UntypedFormControl('');
    this.smtpPassword = new UntypedFormControl('');
    this.smtpServer = new UntypedFormControl('');
    this.activate = new UntypedFormControl(true);

    this.formulario = this.fb.group({
      name: this.name,
      nif: this.nif,
      email: this.email,
      conection: this.conection,
      smtpPort: this.smtpPort,
      smtpUser: this.smtpUser,
      smtpPassword: this.smtpPassword,
      smtpServer: this.smtpServer,
      activate: this.activate,
    });
  }
  ngOnInit(): void {
    this.id = this.data.data.id;
    if (this.id !== 0) {
      this.loadOrganizacion(this.id);
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

    if (this.id === 0) {
      this.store.dispatch(
        addOrganizacion({ organizacion: this.formulario.value })
      );
    } else {
      this.store.dispatch(
        updateOrganizacion({ organizacion: this.formulario.value, id: this.id })
      );
    }

    this.suscripcion = this.store
      .select('organizacionesApp')
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

  loadOrganizacion(id: number) {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }

    var org = { id: id };

    this.store.dispatch(loadOrganizacion({ organizacion: org }));

    this.suscripcion = this.store
      .select('organizacionesApp')
      .subscribe((resultado) => {
        if (resultado.error == undefined && resultado.loading == false) {
          this.name.setValue(resultado.organizacion?.name);
          this.nif.setValue(resultado.organizacion?.nif);
          this.email.setValue(resultado.organizacion?.email);
          this.conection.setValue(resultado.organizacion?.conection);
          this.smtpPort.setValue(resultado.organizacion?.smtpPort);
          this.smtpUser.setValue(resultado.organizacion?.smtpUser);
          this.smtpPassword.setValue(resultado.organizacion?.smtpPassword);
          this.smtpServer.setValue(resultado.organizacion?.smtpServer);
          this.activate.setValue(resultado.organizacion?.activate);
        }
      });
  }
}
