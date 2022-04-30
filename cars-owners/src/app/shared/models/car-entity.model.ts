export class CarEntity {
    number: string;
    manufacturer: string;
    model: string;
    productionYear: string;

    constructor(number: string, manufacturer: string, model: string, productionYear: string) {
        this.number = number;
        this.manufacturer = manufacturer;
        this.model = model;
        this.productionYear = productionYear;
    }
}
