import { OrganizacionesDTO } from './organizaciones.dto';
import { RolesDTO } from './roles.dto';

export class UsuariosDTO {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  roles: RolesDTO[];
  organizaciones: OrganizacionesDTO[];
  activate: boolean;

  constructor(
    id: number,
    name: string,
    email: string,
    created_at: Date,
    updated_at: Date,
    roles: RolesDTO[],
    organizaciones: OrganizacionesDTO[],
    activate: boolean
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.roles = roles;
    this.organizaciones = organizaciones;
    this.activate = activate;
  }
}
