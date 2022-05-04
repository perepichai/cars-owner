import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TableCarColumns } from 'src/app/shared/enum/table-columns';
import { CarEntity } from 'src/app/shared/models/car-entity.model';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {

  cars!: CarEntity[];
  columns!: string[];
  OwnerFormGroup!: FormGroup;
  CarsFormGroup!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.OwnerFormGroup = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      middleName: new FormControl('', [Validators.required]),
    });
    this.CarsFormGroup = this.fb.group({
      number: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      manufacturer: new FormControl('', [Validators.required]),
      productionYear: new FormControl('', [Validators.required]),
    });

    this.columns = Object.values(TableCarColumns);

    this.cars = [];
    this.cars.push({    number: 'string',
      manufacturer: 'string',
      model: 'string',
      productionYear: 'string'})
  }

  onSelect(id: any): void {}

}
