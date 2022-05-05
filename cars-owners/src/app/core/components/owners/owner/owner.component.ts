import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { CreateOwner } from 'src/app/core/store/user.actions';
import { Constants } from 'src/app/shared/constants/constants';
import { TableCarColumns } from 'src/app/shared/enum/table-columns';
import { CarEntity } from 'src/app/shared/models/car-entity.model';
import { OwnerEntity } from 'src/app/shared/models/owner-entity.model';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss'],
})
export class OwnerComponent implements OnInit {

  columns!: string[];
  OwnerFormGroup!: FormGroup;
  CarsFormGroup!: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  user!: OwnerEntity;
  car!: CarEntity;
  cars!: FormArray;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.OwnerFormGroup = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      middleName: new FormControl('', [Validators.required]),
      cars: this.fb.array([]),
    });
    this.cars = this.OwnerFormGroup.get('cars') as FormArray;
    this.OwnerFormGroup.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val: OwnerEntity) => {
        this.user = val;
      });

    this.columns = Object.values(TableCarColumns);
  }

  private newForm(): FormGroup {
    const CarsFormGroup = this.fb.group({
      number: new FormControl('', [Validators.required, Validators.maxLength(Constants.MAX_LENGTH), Validators.pattern(Constants.NUMBER_REGEX)]),
      model: new FormControl('', [Validators.required]),
      manufacturer: new FormControl('', [Validators.required]),
      productionYear: new FormControl('', [Validators.required]),
    });
    return CarsFormGroup;
  }

  onAddCar(): void {
    this.cars.push(this.newForm());
  }
  onRemove(i: number): void {
    this.cars.removeAt(i);
  }

  onCreate(): void {
    this.store.dispatch(
      new CreateOwner(
        this.user.lastName,
        this.user.firstName,
        this.user.middleName,
        this.user.cars
      )
    );
  }

  onSelect(id: any): void {}
}
