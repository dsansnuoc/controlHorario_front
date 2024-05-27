export class TipoPausasDTO {
  id: number;
  created_at?: Date;
  updated_at?: Date;
  descripcion: string;

  constructor(
    id: number,
    descripcion: string,
    created_at?: Date,
    updated_at?: Date
  ) {
    this.id = id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.descripcion = descripcion;
  }
}
