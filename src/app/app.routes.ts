import { Routes } from '@angular/router';
import { CalendarioComponent } from './controlHorario/calendario/calendario.component';
import { FichajeComponent } from './controlHorario/fichaje/fichaje.component';
import { ListadoOrganizacionesComponent } from './controlHorario/herramientas/organizaciones/listado-organizaciones/listado-organizaciones.component';
import { OrganizacionesComponent } from './controlHorario/herramientas/organizaciones/organizaciones/organizaciones.component';
import { ListadoTiposPausasComponent } from './controlHorario/herramientas/tipoPausa/listado-tipos-pausas/listado-tipos-pausas.component';
import { ListadoTiposSolicitudesComponent } from './controlHorario/herramientas/tipoSolicitud/listado-tipos-solicitudes/listado-tipos-solicitudes.component';
import { ListadoUsuariosComponent } from './controlHorario/herramientas/usuarios/listado-usuarios/listado-usuarios.component';
import { MenuComponent } from './controlHorario/menu/menu.component';
import { SolicitudesComponent } from './controlHorario/solicitudes/solicitudes.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { LoginGuardianService } from './services/auxiliares/login-guardian.service';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: InicioSesionComponent },

  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [LoginGuardianService],
    children: [
      { path: 'fichaje', component: FichajeComponent },
      { path: 'solicitud', component: SolicitudesComponent },
      { path: 'calendario', component: CalendarioComponent },
    ],
  },
  {
    path: 'herramientas',
    component: MenuComponent,
    canActivate: [LoginGuardianService],
    children: [
      {
        path: 'listadoorganizaciones',
        component: ListadoOrganizacionesComponent,
      },
      {
        path: 'organizaciones',
        component: OrganizacionesComponent,
      },
      {
        path: 'organizaciones/:id',
        component: OrganizacionesComponent,
      },
      {
        path: 'listadousuarios',
        component: ListadoUsuariosComponent,
      },
      {
        path: 'listadotipopausa',
        component: ListadoTiposPausasComponent,
      },
      {
        path: 'listadotiposolicitud',
        component: ListadoTiposSolicitudesComponent,
      },
    ],
  },

  // { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
