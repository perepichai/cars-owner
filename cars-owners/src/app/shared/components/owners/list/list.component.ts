import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TableColumns, TableColumnsReverse } from 'src/app/shared/enum/table-columns';
import { OwnerEntity } from 'src/app/shared/models/owner-entity.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() entities: {}[] | undefined;
  @Output() selectedRowId = new EventEmitter<number>();

  displayedColumns: string[] = [];
  columnsToDisplay: string[] = [];
  dataSource = new MatTableDataSource([{}]);
  tableColumnsReverse = TableColumnsReverse;
  tableColumns = TableColumns;
  selection = new SelectionModel<any>(false, []);
  

  @ViewChild(MatTable)
  table!: MatTable<OwnerEntity>;

  onSelect(row: { id: number}): void {
    this.selection.select(row)
    this.selectedRowId.emit(row.id);
  }

  removeData() {
    this.table.renderRows();
  }
  
  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = Object.values(TableColumnsReverse);
    this.columnsToDisplay = Object.values(TableColumns).slice();
    this.dataSource = new MatTableDataSource(this.entities);
  }

  ngOnChanges(changes: SimpleChanges) { 
    if (changes['entities'] && changes['entities'].currentValue) {
      const entities = changes['entities'].currentValue;
      this.dataSource = new MatTableDataSource(entities);
    }
}

}
