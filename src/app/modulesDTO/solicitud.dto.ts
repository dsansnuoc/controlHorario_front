export class SolicitudDTO {
  id: number;
  created_at: Date;
  updated_at: Date;
  userId: string;
  tipo_solicitud: string;
  fecha_solicitud: Date;
  fecha_inicio: Date;
  fecha_fin: Date;
  texto_solicitud: string;
  aceptada?: boolean;
  fecha_aceptada?: Date;
  rechazada?: boolean;
  fecha_rechazada?: Date;

  constructor(
    id: number,
    created_at: Date,
    updated_at: Date,
    userId: string,
    tipo_solicitud: string,
    fecha_solicitud: Date,
    fecha_inicio: Date,
    fecha_fin: Date,
    texto_solicitud: string,
    aceptada?: boolean,
    fecha_aceptada?: Date,
    rechazada?: boolean,
    fecha_rechazada?: Date
  ) {
    this.id = id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.userId = userId;
    this.tipo_solicitud = tipo_solicitud;
    this.fecha_solicitud = fecha_solicitud;
    this.fecha_inicio = fecha_inicio;
    this.fecha_fin = fecha_fin;
    this.aceptada = aceptada;
    this.fecha_aceptada = fecha_aceptada;
    this.rechazada = rechazada;
    this.fecha_rechazada = fecha_rechazada;
    this.texto_solicitud = texto_solicitud;
  }
}
