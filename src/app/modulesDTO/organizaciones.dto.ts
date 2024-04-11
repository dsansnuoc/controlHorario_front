export class OrganizacionesDTO {
  id: number;
  name: string;
  nif: string;
  email: string;
  actived: boolean;

  constructor(
    id: number,
    name: string,
    nif: string,
    email: string,
    actived: boolean
  ) {
    this.id = id;
    this.name = name;
    this.nif = nif;
    this.email = email;
    this.actived = actived;
  }
}
