import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { allTipoSolicitud } from '../../../../actions';
import { AppState } from '../../../../app.reducer';
import { MaterialModules } from '../../../../modules/material.modules';
import { OtherModule } from '../../../../modules/other.modules';
import { PrimeNgModules } from '../../../../modules/primeng.modules';
import { TipoSolicitudDTO } from '../../../../modulesDTO/tipoSolicitud.dto';
import { ListadosCompartidosComponent } from '../../../compartidas/listados/listados-compartidos/listados-compartidos.component';
import { TiposSolicitudesComponent } from '../tipos-solicitudes/tipos-solicitudes.component';

@Component({
  selector: 'app-listado-tipos-solicitudes',
  standalone: true,
  imports: [
    CommonModule,
    OtherModule,
    MaterialModules,
    PrimeNgModules,
    ListadosCompartidosComponent,
  ],
  templateUrl: './listado-tipos-solicitudes.component.html',
  styleUrl: './listado-tipos-solicitudes.component.scss',
})
export class ListadoTiposSolicitudesComponent implements OnInit, OnDestroy {
  tipoSolicitud: TipoSolicitudDTO[] = [];
  campos: any[] = [];

  suscripcion: Subscription = new Subscription();

  conection: any;

  constructor(
    private translate: TranslateService,
    private store: Store<AppState>,
    private route: Router,
    private dialog: MatDialog //public dialogService: DialogService
  ) {
    this.campos.push(
      {
        campo: 'id',
        filtro: true,
        nombreColumna: 'general.id',
        type: 'value',
      },
      {
        campo: 'description',
        filtro: true,
        nombreColumna: 'general.nombre',
        type: 'value',
      }
    );
  }

  ngOnInit(): void {
    let user = JSON.parse(sessionStorage.getItem('user') ?? '');
    this.conection = user.organizaciones[0].conection;
    this.loadTiposSolicitud();
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

  recibeEvent($event: any) {
    switch ($event.tipo) {
      case 'C':
        const dialogRef = this.dialog.open(TiposSolicitudesComponent, {
          data: { data: { id: 0 } },
          height: '65vh',
          width: '95vh',
          disableClose: true,
        });

        dialogRef.afterClosed().subscribe((result: any) => {
          if (result) {
            this.loadTiposSolicitud();
          }
        });

        break;

      case 'E':
        const dialogRefE = this.dialog.open(TiposSolicitudesComponent, {
          data: { data: { id: $event.valor.id } },
          height: '65vh',
          width: '95vh',
          disableClose: true,
        });

        dialogRefE.afterClosed().subscribe((result: any) => {
          if (result) {
            this.loadTiposSolicitud();
          }
        });

        break;
    }
  }
}
