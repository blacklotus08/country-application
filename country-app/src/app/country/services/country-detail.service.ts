import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryDetailService {
  baseUrl = 'https://restcountries.com/v3.1/name/';
  public countries: Array<any>[];

  constructor(private httpService: HttpClient) { }

  getCountryDetail(name) {
    this.httpService.get(this.baseUrl + name)
      .subscribe((countries: Array<any>[]) => {
        this.countries = countries;
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
            console.log('Client-side error occured.');
        } else {
            console.log('Server-side error occured.');
            this.countries = [];
        }
    }
      );
  }
}








