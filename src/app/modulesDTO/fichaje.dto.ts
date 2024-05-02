export class FichajeDTO {
  id: number;
  created_at: Date;
  updated_at: Date;
  userId: string;
  tipo_fichaje?: string;
  tipo_pausa?: string;
  hora_fichaje: Date;

  constructor(
    id: number,
    created_at: Date,
    updated_at: Date,
    userId: string,
    hora_fichaje: Date,
    tipo_fichaje?: string,
    tipo_pausa?: string
  ) {
    this.id = id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.userId = userId;
    this.tipo_fichaje = tipo_fichaje;
    this.tipo_pausa = tipo_pausa;
    this.hora_fichaje = hora_fichaje;
  }
}
