import { Component, OnInit } from '@angular/core';
import { Salary } from '../_models/salary';
import { parseHostBindings } from '@angular/compiler';
import { SalaryService } from '../_services/salary.service';
import { HttpBackend } from '@angular/common/http';

@Component({
  selector: 'app-salary-management',
  templateUrl: './salary-management.component.html',
  styleUrls: ['./salary-management.component.css']
})
export class SalaryManagementComponent implements OnInit {

  private salary;

  constructor(private salaryService: SalaryService) { }

  ngOnInit() { }

  updateSalary(){
    let salary = new Salary;

    salary.basic_salary = (<HTMLInputElement>document.getElementById("basic")).value;
    salary.house_rent_allowance = (<HTMLInputElement>document.getElementById("house_rent_allowance")).value;
    salary.medical_allowance = (<HTMLInputElement>document.getElementById("medical_allowance")).value;
    salary.special_allowance = (<HTMLInputElement>document.getElementById("special_allowance")).value;
    salary.phone_bill_allowance = (<HTMLInputElement>document.getElementById("phone_bill_allowance")).value;
    salary.fuel_allowance = (<HTMLInputElement>document.getElementById("fuel_allowance")).value;
    salary.other_allowance = (<HTMLInputElement>document.getElementById("other_allowance")).value;

    salary.provident_fund = (<HTMLInputElement>document.getElementById("provident_fund")).value;
    salary.tax_deduction = (<HTMLInputElement>document.getElementById("tax_deduction")).value;
    salary.other_deduction = (<HTMLInputElement>document.getElementById("other_deduction")).value;

    salary.gross_salary = (<HTMLInputElement>document.getElementById("gross_salary")).value;
    salary.total_deduction = (<HTMLInputElement>document.getElementById("total_deduction")).value;
    salary.net_salary = (<HTMLInputElement>document.getElementById("net_salary")).value;

    this.salaryService.updateSalaryInfo(salary).subscribe(data => {
      console.log(data);

      if(data[0].status == "FAILED"){
        console.log(data[0].message);
      }
      
      else{
        alert("Invalid Input")
      }
    })
  }
}
