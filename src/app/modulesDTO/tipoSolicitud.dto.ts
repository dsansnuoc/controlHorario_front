export class TipoSolicitudDTO {
  id: number;
  created_at: Date;
  updated_at: Date;
  description: string;

  constructor(
    id: number,
    created_at: Date,
    updated_at: Date,
    description: string
  ) {
    this.id = id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.description = description;
  }
}
