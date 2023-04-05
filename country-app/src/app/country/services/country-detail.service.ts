import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryDetailService {
  baseUrl = 'https://restcountries.com/v3.1/name/';
  public countries = {};

  constructor(private httpService: HttpClient) { }

  getCountryDetail(name: string) {
    this.httpService.get(this.baseUrl + name)
      .subscribe((countries) => {
        this.countries = countries;
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else {
            this.countries = [];
        }
    }
      );
  }
}








