import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MaterialModules } from '../../../../modules/material.modules';
import { OtherModule } from '../../../../modules/other.modules';
import { PrimeNgModules } from '../../../../modules/primeng.modules';
import { OrganizacionesDTO } from '../../../../modulesDTO/organizaciones.dto';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
//import { DialogService } from 'primeng/dynamicdialog';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {
  allOrganizaciones,
  updateStatusOrganizacion,
} from '../../../../actions';
import { AppState } from '../../../../app.reducer';
import { ListadosCompartidosComponent } from '../../../compartidas/listados/listados-compartidos/listados-compartidos.component';
import { OrganizacionesComponent } from '../organizaciones/organizaciones.component';

@Component({
  selector: 'app-listado-organizaciones',
  standalone: true,
  imports: [
    CommonModule,
    OtherModule,
    MaterialModules,
    PrimeNgModules,
    ListadosCompartidosComponent,
    OrganizacionesComponent,
  ],
  templateUrl: './listado-organizaciones.component.html',
  styleUrl: './listado-organizaciones.component.scss',
})
export class ListadoOrganizacionesComponent implements OnInit {
  organizaciones: OrganizacionesDTO[] = [];
  campos: any[] = [];

  activos: boolean = false;

  suscripcion: Subscription = new Subscription();

  constructor(
    private translate: TranslateService,
    private store: Store<AppState>,
    private route: Router,
    private dialog: MatDialog //public dialogService: DialogService
  ) {
    this.campos.push(
      {
        campo: 'nif',
        filtro: true,
        nombreColumna: 'general.nif',
        type: 'value',
      },
      {
        campo: 'name',
        filtro: true,
        nombreColumna: 'general.nombre',
        type: 'value',
      },
      {
        campo: 'email',
        filtro: true,
        nombreColumna: 'general.email',
        type: 'value',
      }
    );
  }
  ngOnInit(): void {
    this.loadOrganizaciones();
  }

  recibeEvent($event: any) {
    switch ($event.tipo) {
      case 'C':
        const dialogRef = this.dialog.open(OrganizacionesComponent, {
          data: { data: { id: 0 } },
          height: '65vh',
          width: '95vh',
          disableClose: true,
        });

        dialogRef.afterClosed().subscribe((result: any) => {
          if (result) {
            this.loadOrganizaciones();
          }
        });

        break;

      case 'E':
        const dialogRefE = this.dialog.open(OrganizacionesComponent, {
          data: { data: { id: $event.valor.id } },
          height: '65vh',
          width: '95vh',
          disableClose: true,
        });

        dialogRefE.afterClosed().subscribe((result: any) => {
          if (result) {
            this.loadOrganizaciones();
          }
        });

        break;

      case 'S':
        this.activos = $event.valor;
        this.loadOrganizaciones();
        break;

      case 'B':
        this.cambiarEstadoOrganizacion($event.valor.id, false);

        break;

      case 'A':
        this.cambiarEstadoOrganizacion($event.valor.id, true);

        break;
    }
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
          if (this.activos === false) {
            this.organizaciones = this.organizaciones.filter(
              (org) => org.activate == true
            );
          }
        }
      });
  }

  cambiarEstadoOrganizacion(id: number, estado: boolean) {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }

    let valores = {
      id: id,
      activate: estado,
    };

    this.store.dispatch(updateStatusOrganizacion({ organizacion: valores }));

    this.suscripcion = this.store
      .select('organizacionesApp')
      .subscribe((resultado) => {
        if (resultado.error == undefined && resultado.loading == false) {
          this.loadOrganizaciones();
        }
      });
  }
}
