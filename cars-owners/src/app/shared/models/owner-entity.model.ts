import { CarEntity } from "./car-entity.model";

export class OwnerEntity {
    id?: number | null;
    firstName: string;
    middleName: string;
    lastName: string;
    cars: CarEntity[];
    carsQuantity: number;

    constructor(firstName: string, middleName: string, lastName: string, cars: CarEntity[], id?: number | null, carsQuantity?: number) {
        this.id = id;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.cars = cars;
        this.carsQuantity = cars.length;
    }
}