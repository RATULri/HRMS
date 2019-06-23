import { Component } from '@angular/core';
import { SignupService } from '../_services/signup.service';
import { Router } from '@angular/router';
import { Employee } from '../_models/employee';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  private employee;

  constructor(private signupService: SignupService, private router: Router) {}
  
  addEmployee(){
    let employee = new Employee;

    employee.full_name = (<HTMLInputElement>document.getElementById("name")).value;
    employee.date_of_birth = (<HTMLInputElement>document.getElementById("date_of_birth")).value;
    employee.gender = (<HTMLInputElement>document.getElementById("gender")).value;
    employee.marital_status = (<HTMLInputElement>document.getElementById("marital_status")).value;
    employee.fathers_name = (<HTMLInputElement>document.getElementById("fathers_name")).value;
    employee.nationality = (<HTMLInputElement>document.getElementById("nationality")).value;
    employee.passport_number = (<HTMLInputElement>document.getElementById("passport_number")).value;

    employee.email = (<HTMLInputElement>document.getElementById("email")).value;
    employee.phone = (<HTMLInputElement>document.getElementById("phone")).value;
    employee.present_address = (<HTMLInputElement>document.getElementById("present_address")).value;
    employee.permanent_address = (<HTMLInputElement>document.getElementById("permanent_address")).value;
    
    employee.employee_id = (<HTMLInputElement>document.getElementById("employee_id")).value;
    employee.department_id = (<HTMLInputElement>document.getElementById("department")).value;
    employee.designation_id = (<HTMLInputElement>document.getElementById("designation")).value;
    employee.joining_date = (<HTMLInputElement>document.getElementById("joining_date")).value;
    //employee.working_days = (<HTMLInputElement>document.getElementById("working_days")).value;
    
    employee.user_name = (<HTMLInputElement>document.getElementById("user_name")).value;
    employee.password = (<HTMLInputElement>document.getElementById("password")).value;

    this.signupService.createUser(employee).subscribe(data => {
      console.log(data);

      if(data[0].status == "FAILED"){
        console.log(data[0].message);
      }

      else{
        alert("Registration complete");
      }
    })
  }
}
