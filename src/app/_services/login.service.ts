import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private login_url: string = "http://192.168.0.158:8000/api/login";

  constructor(private http: HttpClient) { }

  login(user: User): Observable<User>{
    return this.http.post(this.login_url, user, httpOptions).pipe(
      tap((loggedUser: User) => console.log(`Login credentials posted successful.`)),
      catchError(this.handleError<User>('Login'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
