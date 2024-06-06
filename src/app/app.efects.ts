import { ExportEffects } from './effects/export.effects';
import { FichajeEffects } from './effects/fichaje.effects';
import { LoginEffects } from './effects/login.effects';
import { OrganizacionesEffects } from './effects/organizaciones.effects';
import { RolesEffects } from './effects/roles.effects';
import { SolicitudEffects } from './effects/solicitudes.effects';
import { TipoPausaEffects } from './effects/tipoPausa.effects';
import { TipoSolicitudEffects } from './effects/tipoSolicitud.effects';
import { UsuariosEffects } from './effects/usuarios.effects';

export const EffectsArray: any[] = [
  LoginEffects,
  OrganizacionesEffects,
  UsuariosEffects,
  RolesEffects,
  TipoPausaEffects,
  TipoSolicitudEffects,
  FichajeEffects,
  SolicitudEffects,
  ExportEffects,
];
