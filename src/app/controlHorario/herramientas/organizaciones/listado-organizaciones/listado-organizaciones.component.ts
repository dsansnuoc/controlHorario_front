import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MaterialModules } from '../../../../modules/material.modules';
import { OtherModule } from '../../../../modules/other.modules';
import { PrimeNgModules } from '../../../../modules/primeng.modules';
import { OrganizacionesDTO } from '../../../../modulesDTO/organizaciones.dto';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.reducer';
import { ListadosCompartidosComponent } from '../../../compartidas/listados/listados-compartidos/listados-compartidos.component';

@Component({
  selector: 'app-listado-organizaciones',
  standalone: true,
  imports: [
    CommonModule,
    OtherModule,
    MaterialModules,
    PrimeNgModules,
    ListadosCompartidosComponent,
  ],
  templateUrl: './listado-organizaciones.component.html',
  styleUrl: './listado-organizaciones.component.scss',
})
export class ListadoOrganizacionesComponent {
  organizaciones: OrganizacionesDTO[] = [];
  campos: any[] = [];

  constructor(
    private translate: TranslateService,
    private store: Store<AppState>,
    private route: Router
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

  recibeEvent($event: any) {
    switch ($event.tipo) {
      case 'C':
        this.route.navigate(['herramientas/organizaciones']);
        break;
    }
  }
}
