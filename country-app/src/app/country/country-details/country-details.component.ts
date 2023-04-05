import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

import { CountryDetailService } from '../services/country-detail.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent {
  constructor(
    private acttivatedRoute: ActivatedRoute,
    private countryDetailService: CountryDetailService,
    private spinner: NgxSpinnerService,
    private location: Location

  ) { }

  country_name = '';
  param_name = '';

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.getCountry();
    }, 2000);

  }

  getCountry(): void {
    this.acttivatedRoute.params
      .subscribe(
        param => {
          if (param) {
            this.countryDetailService.getCountryDetail(param['name']);
            this.spinner.hide();
          }
        }
      );
  }

  get country() : any {
    return this.countryDetailService.countries;
  }

  goBack(): void {
    this.location.back();
  }

}
