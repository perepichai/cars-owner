import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TableOwnerColumns } from 'src/app/shared/enum/table-columns';
import { OwnerEntity } from 'src/app/shared/models/owner-entity.model';
import { GetOwnerById, GetOwners } from '../../store/user.actions';
import { UserState } from '../../store/user.state';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss']
})
export class OwnersComponent implements OnInit {
  @Select(UserState.owners)
  owners$!: Observable<OwnerEntity[]>;
  owners!: OwnerEntity[];
  @Select(UserState.owners)
  owner$!: Observable<OwnerEntity>;
  ownerId!: number;
  isDisabled: boolean = true;
  destroy$: Subject<boolean> = new Subject<boolean>();
  columns!: TableOwnerColumns[];
  test!: OwnerEntity[];

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.owners$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((owners: OwnerEntity[]) => this.owners = owners);
    this.store.dispatch(new GetOwners());
    this.columns = Object.values(TableOwnerColumns);
  }

  onEdit(): void {
    console.log('edit')
  }
  onRemove(): void {
    console.log('remove')
  }
  onSelect(id: number): void {
    this.isDisabled = false;
    this.ownerId = id;
    console.log('asdads ' + this.ownerId)
  }
  get(): void {
    this.store.dispatch(new GetOwnerById(1));
  }

}
