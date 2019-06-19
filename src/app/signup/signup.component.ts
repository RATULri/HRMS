import { Component, OnInit } from '@angular/core';
import { SignupService } from '../_services/signup.service';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { Z_FULL_FLUSH } from 'zlib';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private user;

  constructor(private signupService: SignupService, private router: Router) { }

  ngOnInit() { }

  createUser(): void{
    let user = new User;

    // this.signupService.test().subscribe(date => {
    //   console.log(`hi.....`);
    // })

    user.full_name = (<HTMLInputElement>document.getElementById("name")).value;
    user.user_name = (<HTMLInputElement>document.getElementById("user_name")).value;
    user.email = (<HTMLInputElement>document.getElementById("email")).value;
    user.password = (<HTMLInputElement>document.getElementById("password")).value;
    user.c_password = (<HTMLInputElement>document.getElementById("c_password")).value;
    user.date_of_birth = (<HTMLInputElement>document.getElementById("date_of_birth")).value;
    user.gender = (<HTMLInputElement>document.getElementById("gender")).value;
    user.nationality = (<HTMLInputElement>document.getElementById("nationality")).value;
    user.passport_number = (<HTMLInputElement>document.getElementById("passport_number")).value;
    user.personal_address = (<HTMLInputElement>document.getElementById("present_address")).value;
    user.city = (<HTMLInputElement>document.getElementById("city")).value;
    user.phone = (<HTMLInputElement>document.getElementById("phone")).value;
    user.designation_id = (<HTMLInputElement>document.getElementById("designation")).value;
    user.salary_id = (<HTMLInputElement>document.getElementById("salary")).value;
    user.salary_id = (<HTMLInputElement>document.getElementById("working_days")).value;
    user.joining_date = (<HTMLInputElement>document.getElementById("joining_date")).value;

    this.signupService.createUser(user).subscribe(date => {
      console.log(`successful sign up`);
    })
  }
}
