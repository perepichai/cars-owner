import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { filter, Observable, Subject, take, takeUntil } from 'rxjs';
import { ActivateEditMode, ActivateViewMode, CreateOwner, EditOwner, GetOwnerById } from 'src/app/core/store/user.actions';
import { UserState } from 'src/app/core/store/user.state';
import { Constants } from 'src/app/shared/constants/constants';
import { TableCarColumns } from 'src/app/shared/enum/table-columns';
import { CarEntity } from 'src/app/shared/models/car-entity.model';
import { OwnerEntity } from 'src/app/shared/models/owner-entity.model';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss'],
})
export class OwnerComponent implements OnInit, OnDestroy {
  @Select(UserState.owner)
  owner$!: Observable<OwnerEntity>;
  isEditMode = false;
  isViewMode = false;
  columns!: string[];
  OwnerFormGroup!: FormGroup;
  CarsFormGroup!: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  user!: OwnerEntity;
  car!: CarEntity;
  cars!: FormArray;
  ownerId!: number;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute
  ) {
    this.OwnerFormGroup = this.fb.group({
      id: new FormControl(),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      middleName: new FormControl('', [Validators.required]),
      cars: this.fb.array([]),
    });
    this.cars = this.OwnerFormGroup.get('cars') as FormArray;
  }

  ngOnInit(): void {
    this.isEditMode = this.store.selectSnapshot<boolean>(UserState.isEditMode);
    this.isViewMode = this.store.selectSnapshot<boolean>(UserState.isViewMode);

    if (this.isEditMode || this.isViewMode) {
      this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
        this.ownerId = Number(params['id']);
        this.store.dispatch(new GetOwnerById(this.ownerId));
      });

      this.owner$
        .pipe(
          filter((owner: OwnerEntity) => !!owner),
          takeUntil(this.destroy$))
        .subscribe((owner: OwnerEntity) => {
          this.setUser(owner);
        });

    }

    this.columns = Object.values(TableCarColumns);

    this.OwnerFormGroup.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe((val: OwnerEntity) => {
      this.user = val;
      this.user.carsQuantity = val.cars.length;
    });

  }

  private setUser(user: OwnerEntity): void {
    this.cars.clear();
    this.OwnerFormGroup.reset();
    this.OwnerFormGroup.patchValue(user);
    user.cars.forEach((car: CarEntity) => {
      let carForm = this.newForm();
      carForm.patchValue(car);
      this.cars.push(carForm);
    });

    if (this.isViewMode) {
      this.OwnerFormGroup.disable();
      this.cars.disable();
    }

  }

  private newForm(): FormGroup {
    const CarsFormGroup = this.fb.group({
      id: new FormControl(),
      number: new FormControl('', [
        Validators.required,
        Validators.maxLength(Constants.MAX_LENGTH),
        Validators.pattern(Constants.NUMBER_REGEX),
      ]),
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

  onSave(): void {
    this.isEditMode
      ? this.store.dispatch(new EditOwner(this.user))
      : this.store.dispatch(
          new CreateOwner(
            this.user.lastName,
            this.user.firstName,
            this.user.middleName,
            this.user.cars
          )
        );

    this.store.dispatch(new ActivateEditMode(false));
    this.store.dispatch(new ActivateViewMode(false));
  }

  onBack(): void {
    this.store.dispatch(new ActivateViewMode(false));
    this.store.dispatch(new ActivateEditMode(false));
    this.OwnerFormGroup.reset();
    this.cars.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.unsubscribe();
  }
  
}
