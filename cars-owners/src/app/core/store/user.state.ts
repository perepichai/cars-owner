import { Injectable } from '@angular/core';
import { OwnerEntity } from 'src/app/shared/models/owner-entity.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CarOwnerService } from '../services/car-owners/car-owner.service';
import { Observable, tap } from 'rxjs';
import { ActivateEditMode, ActivateViewMode, CreateOwner, DeleteOwner, EditOwner, GetOwnerById, GetOwners } from './user.actions';

export interface UserStateModel {
  owners: OwnerEntity[];
  owner: OwnerEntity,
  isEditMode: boolean,
  isViewMode: boolean;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    owners: [],
    owner: {
      firstName: '',
      middleName: '',
      lastName: '',
      cars: [],
      carsQuantity: 0,
    },
    isEditMode: false,
    isViewMode: false
  },
})
@Injectable()
export class UserState {
  @Selector()
  static owners(state: UserStateModel): OwnerEntity[] {
    return state.owners;
  }
  @Selector()
  static owner(state: UserStateModel): OwnerEntity {
    return state.owner;
  }
  @Selector()
  static isEditMode(state: UserStateModel): boolean {
    return state.isEditMode;
  }
  @Selector()
  static isViewMode(state: UserStateModel): boolean {
    return state.isViewMode;
  }

  constructor(private carOwnerService: CarOwnerService) {}

  @Action(GetOwners)
  getOwners(
    { patchState }: StateContext<UserStateModel>,
    {}: GetOwners
  ): Observable<object> {
    return this.carOwnerService.getOwners().pipe(
      tap((owners: OwnerEntity[]) => {
        return patchState({ owners: owners });
      })
    );
  }

  @Action(GetOwnerById)
  getOwnerById(
    { patchState }: StateContext<UserStateModel>,
    { id }: GetOwnerById
  ): Observable<object> {
    return this.carOwnerService.getOwnerById(id).pipe(
      tap((owner: OwnerEntity) => {
        return patchState({ owner: owner });
      })
    );
  }

  @Action(EditOwner)
  editOwner(
    { patchState }: StateContext<UserStateModel>,
    { owner }: EditOwner
  ): Observable<object> {
    return this.carOwnerService.editOwner(owner).pipe(
      tap((owner: OwnerEntity) => {
        return patchState({ owner: owner });
      })
    );
  }

  @Action(CreateOwner)
  createOwner(
    { patchState, dispatch }: StateContext<UserStateModel>,
    { lastName, firstName, middleName, cars }: CreateOwner
  ): Observable<object> {
    return this.carOwnerService
      .createOwner(lastName, firstName, middleName, cars)
      .pipe(
        tap((owner: OwnerEntity) => {
          dispatch(new GetOwners());
          return patchState({ owner: owner });
        })
      );
  }

  @Action(DeleteOwner)
  deleteOwner(
    { patchState, dispatch }: StateContext<UserStateModel>,
    { id }: DeleteOwner
  ): Observable<object> {
    return this.carOwnerService.deleteOwner(id).pipe(
      tap((owners: OwnerEntity[]) => {
        dispatch(new GetOwners());
        return patchState({ owners: owners });
      })
    );
  }

  @Action(ActivateEditMode)
  activateEditMode({ patchState }: StateContext<UserStateModel>, { payload }: ActivateEditMode): void {
    patchState({ isEditMode: payload });
  }

  @Action(ActivateViewMode)
  activateViewMode({ patchState }: StateContext<UserStateModel>, { payload }: ActivateViewMode): void {
    patchState({ isViewMode: payload });
  }

}
