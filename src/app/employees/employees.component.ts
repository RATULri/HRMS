import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { EmployeesDataSource, EmployeesItem } from './employees-datasource';
import { EmployeeService } from '../_services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<EmployeesItem>;
  dataSource: EmployeesDataSource;

  displayedColumns = ['id', 'name', 'department', 'designation', 'action'];

  constructor(private employeeService: EmployeeService){}

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(data => {
      this.dataSource = new EmployeesDataSource(data[0].users);
      
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    })
  }

  ngAfterViewInit() {
  }

  deleteEmployee(){
    let employee_id = (<HTMLInputElement>document.getElementById("btn_delete_employee")).value;
    console.log(employee_id);
  }
}
