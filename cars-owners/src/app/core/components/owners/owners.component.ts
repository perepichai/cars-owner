import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { OwnerEntity } from 'src/app/shared/models/owner-entity.model';
import { CreateOwner, GetOwnerById, GetOwners } from '../../core/user.actions';
import { UserState } from '../../core/user.state';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss']
})
export class OwnersComponent implements OnInit {
  @Select(UserState.owners)
  owners$!: Observable<OwnerEntity[]>;
  owners: OwnerEntity[] = [];
  @Select(UserState.owners)
  owner$!: Observable<OwnerEntity>;
  owner: OwnerEntity = {
    firstName: 'Test',
    middleName: 'Test',
    lastName: 'Testovych',
    cars: []
  };
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.owners$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((owners: OwnerEntity[]) => this.owners = owners);
    this.store.dispatch(new GetOwners());
  }
  create(): void {
    this.store.dispatch(new CreateOwner('Test 2', this.owner.firstName, this.owner.middleName, this.owner.cars));
  }
  get(): void {
    this.store.dispatch(new GetOwnerById(1));
  }

}
