import { Injectable } from '@angular/core';
import { OwnerEntity } from 'src/app/shared/models/owner-entity.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CarOwnerService } from '../services/car-owners/car-owner.service';
import { Observable, tap } from 'rxjs';
import { CreateOwner, GetOwnerById, GetOwners } from './user.actions';

export interface UserStateModel {
  owners: OwnerEntity[];
  owner: OwnerEntity
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
    },
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
}
