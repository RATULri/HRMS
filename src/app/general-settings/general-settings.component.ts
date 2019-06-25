import { Component, OnInit } from '@angular/core';
import { GeneralSettingsService } from '../_services/general-settings.service';
import { Company } from '../_models/company';
import { WorkingDays } from '../_models/workingDays';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.css']
})
export class GeneralSettingsComponent implements OnInit {

  private company;
  private workingDays;

  constructor(private generalSettingsService: GeneralSettingsService) { }

  ngOnInit() {
  }

  updateCompanyInfo(){
    let workingDays = new WorkingDays;
    let company = new Company;
    
    workingDays.sunday = (<HTMLInputElement>document.getElementById("sun")).checked;
    workingDays.monday = (<HTMLInputElement>document.getElementById("mon")).checked;
    workingDays.tuesday = (<HTMLInputElement>document.getElementById("tue")).checked;
    workingDays.wednesday = (<HTMLInputElement>document.getElementById("wed")).checked;
    workingDays.thursday = (<HTMLInputElement>document.getElementById("thu")).checked;
    workingDays.friday = (<HTMLInputElement>document.getElementById("fri")).checked;
    workingDays.saturday = (<HTMLInputElement>document.getElementById("sat")).checked;


    company.company_name = (<HTMLInputElement>document.getElementById("company_name")).value;
    company.email = (<HTMLInputElement>document.getElementById("email")).value;
    company.address = (<HTMLInputElement>document.getElementById("address")).value;
    company.country = (<HTMLInputElement>document.getElementById("country")).value;
    company.phone = (<HTMLInputElement>document.getElementById("phone")).value;
    company.mobile = (<HTMLInputElement>document.getElementById("mobile")).value;
    company.website = (<HTMLInputElement>document.getElementById("website")).value;
    
    this.generalSettingsService.updateWorkingDays(workingDays).subscribe(data => {
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
