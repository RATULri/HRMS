import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeesItem } from '../employees/employees-datasource';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<EmployeesItem>{
    return this.http.get<EmployeesItem>("http://192.168.0.158:8000/api/users");
  }

  deleteEmployee(id){
    return this.http.get("http://192.168.0.158:8000/api/delete/user/" + id);
  }
}
