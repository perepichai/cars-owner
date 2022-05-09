import { CarEntity } from "src/app/shared/models/car-entity.model";
import { OwnerEntity } from "src/app/shared/models/owner-entity.model";

export class GetOwners {
  static readonly type = '[user] get all owners';
  constructor() {}
}
export class GetOwnerById {
  static readonly type = '[user] get owner';
  constructor(public id: number) {}
}

export class DeleteOwner {
  static readonly type = '[user] delete owner';
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

export class EditOwner {
  static readonly type = '[user] edit user';
  constructor(public owner: OwnerEntity) { }
}

export class CreateCar {
  static readonly type = '[car] create car';
  constructor(
    public number: string,
    public model: string,
    public manufacturer: string,
    public productionYear: string
  ) {}
}

export class ActivateEditMode {
  static readonly type = '[user] activate edit Mode';
  constructor(public payload: boolean) { }
}

export class ActivateViewMode {
  static readonly type = '[user] activate view Mode';
  constructor(public payload: boolean) { }
}