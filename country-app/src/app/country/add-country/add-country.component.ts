import { Component } from '@angular/core';
import { CountryService } from '../services/country.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Country } from '../models/country.model';
import {Location} from '@angular/common';
import { ValidateIdNotTaken } from '../validators/async-code-not-taken.validator';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.scss']
})
export class AddCountryComponent {
  countryForm!: FormGroup;
  countries: Country[] = [];
  errorMessage = '';
  codeMessage = '';

  constructor(private countriesService: CountryService,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private fb: FormBuilder,
              private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.countriesService.getCountry().subscribe(
      countries => {
        this.countries = countries;
      },
      error => this.errorMessage = error as any
    );

    this.countryForm = this.fb.group({
      countryCode: ['', [Validators.required]],
      countryName: ['', Validators.required],
      countryRegion: 'Africa'
    });

    this.countryForm.controls['countryCode'].setAsyncValidators(ValidateIdNotTaken.createValidator(this.countriesService));

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);

  }

  get countryCode() {
    return this.countryForm.get('countryCode');
  }

  save() {
    const countries = {
      country_code: this.countryForm?.get('countryCode')?.value,
      country_name: this.countryForm?.get('countryName')?.value,
      country_region: this.countryForm?.get('countryRegion')?.value,
    };
    this.countriesService.addCountry(countries);
    this.router.navigate(['/']);
    this.toastr.success('Record successfully added.', '',
      {
        positionClass: 'toast-top-center',
        closeButton: true,
        timeOut: 5000
      }
    );

  }

  goBack(): void {
    this.location.back();
  }

  populateTestData(): void {
    this.countryForm.patchValue({
      countryCode: 'CHN',
      countryName: 'China'
    });
  }

}
