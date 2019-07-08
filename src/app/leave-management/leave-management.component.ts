import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { LeaveManagementDataSource, LeaveManagementItem } from './leave-management-datasource';
import { LeaveService } from '../_services/leave.service';

@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.css']
})
export class LeaveManagementComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<LeaveManagementItem>;
  dataSource: LeaveManagementDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'department', 'designation', 'category','start_date', 'end_date', 'working_days', 'leave_available', 'status', 'action'];

  constructor (private leaveService: LeaveService){}

  ngOnInit() {
    this.leaveService.getLeaves().subscribe(data => {
      this.dataSource = new LeaveManagementDataSource(data[0].leaves);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    })
  }

  ngAfterViewInit() {
  }
}
