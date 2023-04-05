import { Component } from '@angular/core';
import { Country } from '../models/country.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.scss']
})
export class EditCountryComponent {
  countryForm!: FormGroup;
  errorMessage = '';
  country!: Country;
  countries: Country[] = [];
  AllCountries!: Country;
  collectionSize: number = 0;

  constructor(private acttivatedRoute: ActivatedRoute,
              private countriesService: CountryService,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private fb: FormBuilder,
              private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.countryForm = this.fb.group({
      countryCode: ['', [Validators.required]],
      countryName: ['', Validators.required],
      countryRegion: 'Africa'
    });

    const param = this.acttivatedRoute.snapshot.paramMap.get('id');
    this.acttivatedRoute.params
      .subscribe(
        param => {
          if (param) {
            this.spinner.show();
            this.getCountry(param['id']);
          }
        }
      );
  }

  getCountry(id:any): void {
    this.countriesService.getCountryById(id)
      .subscribe(
        (country: Country) => this.displayCountry(country),
        (error: any) => this.errorMessage = error as any
      );
  }

  displayCountry(country: Country): void {
    if (this.countryForm) {
      this.countryForm.reset();
    }
    this.country = country;

    // Update the data on the form
    this.countryForm.patchValue({
      countryCode: this.country.country_code,
      countryName: this.country.country_name,
      countryRegion: this.country.country_region
    });
    this.spinner.hide();
  }


  saveCountry(): void {
    const param = this.acttivatedRoute.snapshot.paramMap.get('id');
    this.acttivatedRoute.params
      .subscribe(
        param => {
          if (param) {
            const countries = {
              country_code: this.countryForm?.get('countryCode')?.value,
              country_name: this.countryForm?.get('countryName')?.value,
              country_region: this.countryForm?.get('countryRegion')?.value,
            };

            this.countriesService.updateCountry(param['id'], countries);
            this.countriesService.getCountry().subscribe(
              countries => {
                this.countries = countries;

              },
              error => this.errorMessage = error as any
            );
            this.router.navigate(['/']);
            this.toastr.success('Record successfully updated.', '',
              {
                positionClass: 'toast-top-center',
                closeButton: true,
                timeOut: 5000
              }
            );


          }
        }
      );
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.countryForm.reset();
    this.router.navigate(['/country']);
  }

  goBack(): void {
    this.location.back();
  }

}
