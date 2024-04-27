export class UsuarioEnvioDTO {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  roles_id: number;
  organizacion_id: number;
  activate: boolean;

  constructor(
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
    roles_id: number,
    organizacion_id: number,
    activate: boolean
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.password_confirmation = password_confirmation;
    this.roles_id = roles_id;
    this.organizacion_id = organizacion_id;
    this.activate = activate;
  }
}
