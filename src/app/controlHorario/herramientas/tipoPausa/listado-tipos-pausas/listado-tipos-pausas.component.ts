import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { allTipoPausa } from '../../../../actions';
import { AppState } from '../../../../app.reducer';
import { MaterialModules } from '../../../../modules/material.modules';
import { OtherModule } from '../../../../modules/other.modules';
import { PrimeNgModules } from '../../../../modules/primeng.modules';
import { TipoPausasDTO } from '../../../../modulesDTO/tipoPausas.dto';
import { ListadosCompartidosComponent } from '../../../compartidas/listados/listados-compartidos/listados-compartidos.component';
import { TiposPausasComponent } from '../tipos-pausas/tipos-pausas.component';

@Component({
  selector: 'app-listado-tipos-pausas',
  standalone: true,
  imports: [
    CommonModule,
    OtherModule,
    MaterialModules,
    PrimeNgModules,
    ListadosCompartidosComponent,
  ],
  templateUrl: './listado-tipos-pausas.component.html',
  styleUrl: './listado-tipos-pausas.component.scss',
})
export class ListadoTiposPausasComponent implements OnInit, OnDestroy {
  tipoPausas: TipoPausasDTO[] = [];
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
        campo: 'descripcion',
        filtro: true,
        nombreColumna: 'general.nombre',
        type: 'value',
      }
    );
  }
  ngOnInit(): void {
    let user = JSON.parse(sessionStorage.getItem('user') ?? '');
    this.conection = user.organizaciones[0].conection;
    this.loadTiposPausa();
  }
  ngOnDestroy(): void {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }
  }

  loadTiposPausa() {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }

    let valores = {
      nombreConexion: this.conection,
    };

    this.store.dispatch(allTipoPausa({ conexion: valores }));

    this.suscripcion = this.store
      .select('tipoPausasApp')
      .subscribe((resultado) => {
        if (resultado.error == undefined && resultado.loading === false) {
          this.tipoPausas = [...resultado.tipoPausas];
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
        const dialogRef = this.dialog.open(TiposPausasComponent, {
          data: { data: { id: 0 } },
          height: '65vh',
          width: '95vh',
          disableClose: true,
        });

        dialogRef.afterClosed().subscribe((result: any) => {
          if (result) {
            this.loadTiposPausa();
          }
        });

        break;

      case 'E':
        const dialogRefE = this.dialog.open(TiposPausasComponent, {
          data: { data: { id: $event.valor.id } },
          height: '65vh',
          width: '95vh',
          disableClose: true,
        });

        dialogRefE.afterClosed().subscribe((result: any) => {
          if (result) {
            this.loadTiposPausa();
          }
        });

        break;
    }
  }
}
