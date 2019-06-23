import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Company } from '../_models/company';
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
export class GeneralSettingsService {

  private generalSettings_url: string = "";

  constructor(private http:HttpClient) { }

  updateGeneralSettings(company: Company): Observable<Company>{
    return this.http.post(this.generalSettings_url, company, httpOptions).pipe(
      tap((updatedInfo: Company) => console.log(`Info updated successfully`)),
      catchError(this.handleError<Company>('Update'))
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
