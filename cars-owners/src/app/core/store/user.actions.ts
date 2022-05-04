import { CarEntity } from "src/app/shared/models/car-entity.model";

export class GetOwners {
  static readonly type = '[user] get all owners';
  constructor() {}
}
export class GetOwnerById {
  static readonly type = '[user] get owner';
  constructor(public id: number) {}
}
export class CreateOwner {
  static readonly type = '[user] create owner';
  constructor(
    public lastName: string,
    public firstName: string,
    public middleName: string,
    public cars: CarEntity[]
  ) {}
}