import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Salary } from '../_models/salary';
import { Observable, of } from 'rxjs';
import { catchError,tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  private salary_url = "";

  constructor(private http: HttpClient) { }

  updateSalaryInfo(salary: Salary): Observable<Salary>{
    return this.http.post(this.salary_url, salary, httpOptions).pipe(
      tap((updatedInfo: Salary) => console.log(`Info updated successfully`)),
      catchError(this.handleError<Salary>('Update'))
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
