import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import {
  allUsuarios,
  allUsuariosOrganizacion,
  updateStatusUsuario,
} from '../../../../actions';
import { AppState } from '../../../../app.reducer';
import { MaterialModules } from '../../../../modules/material.modules';
import { OtherModule } from '../../../../modules/other.modules';
import { PrimeNgModules } from '../../../../modules/primeng.modules';
import { UsuariosDTO } from '../../../../modulesDTO/usuaios.dto';
import { ListadosCompartidosComponent } from '../../../compartidas/listados/listados-compartidos/listados-compartidos.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';

@Component({
  selector: 'app-listado-usuarios',
  standalone: true,
  templateUrl: './listado-usuarios.component.html',
  styleUrl: './listado-usuarios.component.scss',
  imports: [
    CommonModule,
    OtherModule,
    MaterialModules,
    PrimeNgModules,
    UsuariosComponent,
    ListadosCompartidosComponent,
  ],
})
export class ListadoUsuariosComponent implements OnInit, OnDestroy {
  usuarios: UsuariosDTO[] = [];
  campos: any[] = [];

  activos: boolean = false;

  suscripcion: Subscription = new Subscription();
  org: any;

  constructor(
    private translate: TranslateService,
    private store: Store<AppState>,
    private route: Router,
    private dialog: MatDialog //public dialogService: DialogService
  ) {
    this.campos.push(
      {
        campo: 'name',
        filtro: true,
        nombreColumna: this.translate.instant('general.nombre'),
        type: 'value',
      },
      {
        campo: 'email',
        filtro: true,
        nombreColumna: this.translate.instant('general.email'),
        type: 'value',
      },
      {
        campo: 'roles',
        filtro: false,
        nombreColumna: this.translate.instant('general.rol'),
        type: 'object',
      },
      {
        campo: 'organizaciones',
        filtro: false,
        nombreColumna: this.translate.instant('general.organizaciones'),
        type: 'object',
      }
    );
  }
  ngOnDestroy(): void {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }
  }

  ngOnInit(): void {
    let user = JSON.parse(sessionStorage.getItem('user') ?? '');
    this.org = user.organizaciones;
    if (this.org.length === 0) {
      this.loadUsuarios();
    } else {
      this.loadUsuariosOrganizacion(this.org[0].id);
    }
  }

  recibeEvent($event: any) {
    switch ($event.tipo) {
      case 'C':
        const dialogRef = this.dialog.open(UsuariosComponent, {
          data: { data: { id: 0 } },
          height: '65vh',
          width: '95vh',
          disableClose: true,
        });

        dialogRef.afterClosed().subscribe((result: any) => {
          if (result) {
            if (this.org.length === 0) {
              this.loadUsuarios();
            } else {
              this.loadUsuariosOrganizacion(this.org[0].id);
            }
          }
        });

        break;

      case 'E':
        const dialogRefE = this.dialog.open(UsuariosComponent, {
          data: { data: { id: $event.valor.id } },
          height: '65vh',
          width: '95vh',
          disableClose: true,
        });

        dialogRefE.afterClosed().subscribe((result: any) => {
          console.log(result);

          if (result) {
            if (this.org.length === 0) {
              this.loadUsuarios();
            } else {
              this.loadUsuariosOrganizacion(this.org[0].id);
            }
          }
        });

        break;

      case 'S':
        this.activos = $event.valor;
        if (this.org.length === 0) {
          this.loadUsuarios();
        } else {
          this.loadUsuariosOrganizacion(this.org[0].id);
        }
        break;

      case 'B':
        this.cambiarEstadoUsuario($event.valor.id, false);
        break;

      case 'A':
        this.cambiarEstadoUsuario($event.valor.id, true);
        break;
    }
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
          if (this.activos === false) {
            this.usuarios = this.usuarios.filter((usr) => usr.activate == true);
          }
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
          if (this.activos === false) {
            this.usuarios = this.usuarios.filter((usr) => usr.activate == true);
          }
        }
      });
  }

  cambiarEstadoUsuario(id: number, estado: boolean) {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }

    let valores = {
      id: id,
      activate: estado,
    };

    this.store.dispatch(updateStatusUsuario({ usuario: valores }));

    this.suscripcion = this.store
      .select('usuariosApp')
      .subscribe((resultado) => {
        if (resultado.error == undefined && resultado.loading == false) {
          if (this.org.length === 0) {
            this.loadUsuarios();
          } else {
            this.loadUsuariosOrganizacion(this.org[0].id);
          }
        }
      });
  }
}
