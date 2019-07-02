import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { EmployeesDataSource, EmployeesItem } from './employees-datasource';
import { EmployeeService } from '../_services/employee.service';
import { NavComponent } from '../nav/nav.component';

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
  nav: NavComponent;

  displayedColumns = ['id', 'name', 'department', 'designation', 'action'];

  constructor(private employeeService: EmployeeService){}

  ngOnInit() {
    this.load();
  }

  ngAfterViewInit() {
  }

  deleteEmployee(employee_id){
    this.employeeService.deleteEmployee(employee_id).subscribe(data => {
      console.log(data);
      console.log("Employee deleted");
      this.load();
    })
  }

  editEmployee(){
    this.nav = new NavComponent();
  }

  load(){
    this.employeeService.getEmployees().subscribe(data => {
      this.dataSource = new EmployeesDataSource(data[0].users);
      
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    })
  }
}
