import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarEntity } from 'src/app/shared/models/car-entity.model';
import { ICarOwnersService } from 'src/app/shared/models/car-owner.model';
import { OwnerEntity } from 'src/app/shared/models/owner-entity.model';

@Injectable({
  providedIn: 'root'
})
export class CarOwnerService implements ICarOwnersService {

  constructor() { }
  getOwners(): Observable<OwnerEntity[]> {
    throw new Error('Method not implemented.');
  }
  getOwnerById(aId: number): Observable<OwnerEntity> {
    throw new Error('Method not implemented.');
  }
  createOwner(aLastName: string, aFirstName: string, aMiddleName: string, aCars: CarEntity[]): Observable<OwnerEntity> {
    throw new Error('Method not implemented.');
  }
  editOwner(aOwner: OwnerEntity): Observable<OwnerEntity> {
    throw new Error('Method not implemented.');
  }
  deleteOwner(aOwnerId: number): Observable<OwnerEntity[]> {
    throw new Error('Method not implemented.');
  }
}
