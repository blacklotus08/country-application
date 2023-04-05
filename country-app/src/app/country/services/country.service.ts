import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, } from 'rxjs/operators';

import {Country} from '../models/country.model';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  baseUrl = 'https://country-41d6.restdb.io/rest/country-header';

  httpOptions = {
    headers: new HttpHeaders({
      'x-apikey' : '5d10446782ef885d6e621bc2',
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };

  constructor(private httpService: HttpClient) { }
  getCountry(): Observable<Country[]>  {
    return this.httpService.get<Country[]>(this.baseUrl, this.httpOptions).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))), catchError(this.handleError)
    );
  }


  getCountryById(id: any): Observable<Country> {
    console.log(id);
    return this.httpService.get<Country>(this.baseUrl + '/' + id, this.httpOptions)
      .pipe(
        tap(data => console.log('getCountry: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }


  addCountry(countries: any) {
    console.log('Country: ' + JSON.stringify(countries));
    this.httpService.post(this.baseUrl, countries, this.httpOptions).subscribe(countries);
    console.log('Record successfully added.');
  }

  updateCountry(id: any, countries: any) {
    this.httpService.put(this.baseUrl + '/' + id, countries, this.httpOptions).subscribe(countries);
    this.getCountry();
    console.log('Record successfully updated.');
  }

  deleteCountry(id :any, countries : any) {
    this.httpService.delete(this.baseUrl + '/' + id, this.httpOptions).subscribe(countries);
    console.log('Record successfully deleted.');
  }

  CheckCode(id : any) {
    return this.httpService.get<Country[]>(this.baseUrl, this.httpOptions).pipe(
      tap(data => console.log('Record Check Code:' + JSON.stringify(data))), catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage + 'Error');
    return throwError(errorMessage);
  }

}
