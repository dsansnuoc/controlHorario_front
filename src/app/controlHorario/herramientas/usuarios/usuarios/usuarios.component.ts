import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
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
  addUsuario,
  allOrganizaciones,
  allRoles,
  loadUsuario,
  updateUsuario,
} from '../../../../actions';
import { AppState } from '../../../../app.reducer';
import { GlobalConstants } from '../../../../globals/global-constants';
import { MaterialModules } from '../../../../modules/material.modules';
import { OtherModule } from '../../../../modules/other.modules';
import { PrimeNgModules } from '../../../../modules/primeng.modules';
import { OrganizacionesDTO } from '../../../../modulesDTO/organizaciones.dto';
import { RolesDTO } from '../../../../modulesDTO/roles.dto';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, OtherModule, MaterialModules, PrimeNgModules],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
  providers: [MessageService],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  id: number = 0;
  emailRegex = GlobalConstants.emailRegex;

  // Rol
  roles: RolesDTO[] = [];

  // Organización
  organizaciones: OrganizacionesDTO[] = [];

  suscripcion: Subscription = new Subscription();

  name: UntypedFormControl;
  email: UntypedFormControl;
  password: UntypedFormControl;
  password_confirmation: UntypedFormControl;
  roles_id: UntypedFormControl;
  organizacion_id: UntypedFormControl;
  activate: UntypedFormControl;

  formulario: UntypedFormGroup;

  constructor(
    private translate: TranslateService,
    public dialogRef: MatDialogRef<UsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private messageService: MessageService
  ) {
    this.name = new UntypedFormControl(null, [Validators.required]);
    this.email = new UntypedFormControl(null, [
      Validators.required,
      Validators.pattern(this.emailRegex),
    ]);
    this.password = new UntypedFormControl(null, [Validators.required]);
    this.password_confirmation = new UntypedFormControl(null, [
      Validators.required,
    ]);

    this.roles_id = new UntypedFormControl(null, [Validators.required]);
    this.organizacion_id = new UntypedFormControl(null, [Validators.required]);
    this.activate = new UntypedFormControl(true);

    this.formulario = this.fb.group({
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation,
      roles_id: this.roles_id,
      organizacion_id: this.organizacion_id,
      activate: this.activate,
    });
  }

  ngOnInit(): void {
    this.id = this.data.data.id;
    this.loadRoles();
    setTimeout(() => {
      this.loadOrganizaciones();
      if (this.id != 0) {
        setTimeout(() => {
          this.loadUsuario(this.id);
        }, 200);
      }
    }, 200);
  }

  ngOnDestroy(): void {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }
  }

  loadRoles() {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }

    this.store.dispatch(allRoles());

    this.suscripcion = this.store.select('rolesApp').subscribe((resultado) => {
      if (resultado.error == undefined && resultado.loading == false) {
        this.roles = [...resultado.roles];
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

  loadOrganizaciones() {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }

    this.store.dispatch(allOrganizaciones());

    this.suscripcion = this.store
      .select('organizacionesApp')
      .subscribe((resultado) => {
        if (resultado.error == undefined && resultado.loading == false) {
          this.organizaciones = [...resultado.organizaciones];
          this.organizaciones = this.organizaciones.filter(
            (org) => org.activate === true
          );
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

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onYesClick(): void {
    this.dialogRef.close('Ok');
  }

  save() {
    let valores = {
      name: this.formulario.value.name,
      email: this.formulario.value.email,
      password: this.formulario.value.password,
      password_confirmation: this.formulario.value.password_confirmation,
      roles_id: this.formulario.value.roles_id.id,
      organizacion_id: this.formulario.value.organizacion_id.id,
      activate: this.formulario.value.activate,
    };

    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }

    if (this.id === 0) {
      this.store.dispatch(addUsuario({ usuario: valores }));
    } else {
      this.store.dispatch(updateUsuario({ usuario: valores, id: this.id }));
    }

    this.suscripcion = this.store
      .select('usuariosApp')
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

  loadUsuario(id: number) {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }

    var usr = { id: id };

    this.store.dispatch(loadUsuario({ usuario: usr }));

    this.suscripcion = this.store
      .select('usuariosApp')
      .subscribe((resultado) => {
        if (resultado.error == undefined && resultado.loading == false) {
          this.name.setValue(resultado.usuario?.name);
          this.email.setValue(resultado.usuario?.email);
          this.password.setValue('');
          this.password_confirmation.setValue('');
          this.roles_id.setValue(
            this.roles.find((rol) => rol.id == resultado.usuario?.roles[0].id)
          );
          this.organizacion_id.setValue(
            this.organizaciones.find(
              (org) => org.id == resultado.usuario?.organizaciones[0].id
            )
          );
          console.log(resultado.usuario?.activate);
          this.activate.setValue(
            resultado.usuario?.activate == true ? true : false
          );
        }
      });
  }
}
