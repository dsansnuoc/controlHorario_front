export class PivotDTO {
  user_id: number;
  roles_id: number;

  constructor(user_id: number, roles_id: number) {
    this.user_id = user_id;
    this.roles_id = roles_id;
  }
}
