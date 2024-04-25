export class OrganizacionesDTO {
  id: number;
  name: string;
  nif: string;
  email: string;
  activate: boolean;
  conection: string;
  smtpPort: string;
  smtpUser: string;
  smtpPassword: string;
  smtpServer: string;

  constructor(
    id: number,
    name: string,
    nif: string,
    email: string,
    activate: boolean,
    conection: string,
    smtpPort: string,
    smtpUser: string,
    smtpPassword: string,
    smtpServer: string
  ) {
    this.id = id;
    this.name = name;
    this.nif = nif;
    this.email = email;
    this.activate = activate;
    this.conection = conection;
    this.smtpPort = smtpPort;
    this.smtpUser = smtpUser;
    this.smtpPassword = smtpPassword;
    this.smtpServer = smtpServer;
  }
}
