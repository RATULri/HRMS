import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError,tap } from 'rxjs/operators';
import { User } from '../_models/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private signup_url: string = "http://192.168.0.158:8000/api/register";

  constructor(private http: HttpClient) {}

  // test(): Observable<User>{
  //   return this.http.get<User>(this.signup_url, {responseType: 'json'});
  // }

  createUser(user: User): Observable<User>{
    return this.http.post(this.signup_url,user,httpOptions).pipe(
      tap((newUser: User) => console.log(`Registration Successful.`)),
      catchError(this.handleError<User>('Registration'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of (result as T);
    }
  }

  private log(message: string){
    console.log(message);
  }
}
