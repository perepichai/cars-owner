import { CarEntity } from "./car-entity.model";

export class OwnerEntity {
    id?: number | null;
    firstName: string;
    middleName: string;
    lastName: string;
    cars: CarEntity[];

    constructor(firstName: string, middleName: string, lastName: string, cars: CarEntity[], id?: number | null) {
        this.id = id;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.cars = cars;
    }
}