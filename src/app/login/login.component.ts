import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { LoginService } from '../_services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  login(): void {

    let user = new User();

    user.user_name = (<HTMLInputElement>document.getElementById("user_name")).value;
    user.password = (<HTMLInputElement>document.getElementById("password")).value;

    this.loginService.login(user).subscribe(data => {
      if (data[0].status === "FAILED"){
        alert(data[0].message);
      }

      else{
        this.router.navigate(['/home']);
        console.log(data);
      }
    })
  }

}
