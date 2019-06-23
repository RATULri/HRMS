import { Component, OnInit } from '@angular/core';
import { GeneralSettingsService } from '../_services/general-settings.service';
import { Company } from '../_models/company';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.css']
})
export class GeneralSettingsComponent implements OnInit {

  private company;

  constructor(private generalSettingsService: GeneralSettingsService) { }

  ngOnInit() {
  }

  updateCompanyInfo(){
    let company = new Company;

    company.company_name = (<HTMLInputElement>document.getElementById("company_name")).value;
    company.email = (<HTMLInputElement>document.getElementById("email")).value;
    company.address = (<HTMLInputElement>document.getElementById("address")).value;
    company.country = (<HTMLInputElement>document.getElementById("country")).value;
    company.phone = (<HTMLInputElement>document.getElementById("phone")).value;
    company.mobile = (<HTMLInputElement>document.getElementById("mobile")).value;
    company.website = (<HTMLInputElement>document.getElementById("website")).value;
    
    this.generalSettingsService.updateGeneralSettings(company).subscribe(data => {
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
