import { Routes } from '@angular/router';
import { FichajeComponent } from './controlHorario/fichaje/fichaje.component';
import { ListadoOrganizacionesComponent } from './controlHorario/herramientas/organizaciones/listado-organizaciones/listado-organizaciones.component';
import { OrganizacionesComponent } from './controlHorario/herramientas/organizaciones/organizaciones/organizaciones.component';
import { MenuComponent } from './controlHorario/menu/menu.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { LoginGuardianService } from './services/auxiliares/login-guardian.service';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: InicioSesionComponent },

  {
    path: 'menu',
    component: MenuComponent,
    children: [{ path: 'fichaje', component: FichajeComponent }],
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
    ],
  },

  // { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
