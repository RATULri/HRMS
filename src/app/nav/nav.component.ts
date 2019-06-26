import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationServiceService } from '../_services/authentication-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  private chosenView = 'add employee';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private authenticationService: AuthenticationServiceService, private router: Router) {}

  viewChanger(view): void {
    this.chosenView = view;
  }

  logout(){
    this.authenticationService.logout().subscribe(data => {
      if(data[0].status === "OK"){
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    });
  }
}
