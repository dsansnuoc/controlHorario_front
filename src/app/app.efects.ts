import { LoginEffects } from './effects/login.effects';
import { OrganizacionesEffects } from './effects/organizaciones.effects';
import { RolesEffects } from './effects/roles.effects';
import { UsuariosEffects } from './effects/usuarios.effects';

export const EffectsArray: any[] = [
  LoginEffects,
  OrganizacionesEffects,
  UsuariosEffects,
  RolesEffects,
];
