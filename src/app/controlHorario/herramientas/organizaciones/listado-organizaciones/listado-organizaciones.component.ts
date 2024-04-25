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
import { allOrganizaciones } from '../../../../actions';
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
      },
      { campo: 'name', filtro: true, nombreColumna: 'general.nombre' },
      { campo: 'email', filtro: true, nombreColumna: 'general.email' }
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
        console.log($event.valor.id);
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
        }
      });
  }
}
