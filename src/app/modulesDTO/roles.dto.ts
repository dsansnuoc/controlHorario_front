import { PivotDTO } from './pivot.dto';

export class RolesDTO {
  id: number;
  name: string;
  create_at: Date;
  update_at: Date;
  pivot: PivotDTO[];

  constructor(
    id: number,
    name: string,
    create_at: Date,
    update_at: Date,
    pivot: PivotDTO[]
  ) {
    this.id = id;
    this.name = name;
    this.create_at = create_at;
    this.update_at = update_at;
    this.pivot = pivot;
  }
}
