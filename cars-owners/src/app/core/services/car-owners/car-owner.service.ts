import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Constants } from 'src/app/shared/constants/constants';
import { CarEntity } from 'src/app/shared/models/car-entity.model';
import { ICarOwnersService } from 'src/app/shared/models/car-owner.model';
import { OwnerEntity } from 'src/app/shared/models/owner-entity.model';

@Injectable({
  providedIn: 'root'
})
export class CarOwnerService implements ICarOwnersService {
  private ownersUrl: string = Constants.OWNERS_URL;
  owner: OwnerEntity = {
    firstName: '',
    middleName: '',
    lastName: '',
    cars: [],
    carsQuantity: 0
  };

  constructor(private http: HttpClient) { }
  getOwners(): Observable<OwnerEntity[]> {
    return this.http.get<OwnerEntity[]>(this.ownersUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
  getOwnerById(aId: number): Observable<OwnerEntity> {
    return this.http.get<OwnerEntity>(`${this.ownersUrl}${aId}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
  createOwner(aLastName: string, aFirstName: string, aMiddleName: string, aCars: CarEntity[]): Observable<OwnerEntity> {

    this.owner.id = null;
    this.owner.lastName = aLastName;
    this.owner.firstName = aFirstName;
    this.owner.middleName = aMiddleName;
    this.owner.cars = aCars;
    this.owner.carsQuantity = aCars.length;

    return this.http.post<OwnerEntity>(this.ownersUrl, this.owner).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    );
    
  }
  editOwner(aOwner: OwnerEntity): Observable<OwnerEntity> {
    return this.http.put<OwnerEntity>(`${this.ownersUrl}${aOwner.id}`, aOwner).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }
  deleteOwner(aOwnerId: number): Observable<OwnerEntity[]> {
    return this.http.delete<OwnerEntity[]>(`${this.ownersUrl}${aOwnerId}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
}
