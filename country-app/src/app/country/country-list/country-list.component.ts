import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router  } from '@angular/router';

/*Model*/
import { Country } from '../models/country.model';
/*Service*/
import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent {
  AllCountries: Country[] = [];
  countries: Country[] = [];
  errorMessage = '';
  page = 1;
  pageSize = 5;
  collectionSize = 0;

  _listFilter = '';
  get listFilter(): string {
    if (this._listFilter == '') {
      this.countries = this._regionFilter ? this.performFilterbyRegion(this._regionFilter) : this.countries;
    }
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.countries = this.AllCountries;

    this.countries = this.listFilter ? this.performFilter(this.listFilter) : this.countries;
    this.collectionSize = this.countries.length;
  }

  _regionFilter = '';
  get regionFilter() {
    return this._regionFilter;
  }

  set regionFilter(value: string) {
    this._regionFilter = value;
  }

  constructor(private countriesService: CountryService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private router: Router
  ) { }

  performFilter(filterBy: string): Country[] {
    console.log(this._regionFilter + 'Region Filter: ');
    filterBy = filterBy.toLocaleLowerCase();
    console.log(filterBy + 'Filter');

    if (this._regionFilter == '') {
      return this.countries.filter((country: Country) =>
      (country.country_code.toLocaleLowerCase().indexOf(filterBy) !== -1 || country.country_name.toLocaleLowerCase().indexOf(filterBy) !== -1));

    } else {
      return this.countries.filter((country: Country) =>
      (country.country_code.toLocaleLowerCase().indexOf(filterBy) !== -1 || country.country_name.toLocaleLowerCase().indexOf(filterBy) !== -1)
      && country.country_region == this._regionFilter);
    }

    /* Filter by Search Bar and Drop Down Filter */

  }

  performFilterbyRegion(filterBy: string): Country[] {
    console.log(filterBy + 'Filter by Region');
    return this.countries.filter((country: Country) => country.country_region.indexOf(filterBy) !== -1);
  }

  onChange(deviceValue: any) {
    console.log('Inside On Change: ' + deviceValue);
    this.countries = this.AllCountries;
    this.countries = deviceValue ? this.performFilterbyRegion(deviceValue) : this.countries;
    this.collectionSize = this.countries.length;
  }

  ngOnInit() {

    this.spinner.show();

    this.countriesService.getCountry().subscribe(
      countries => {
        this.countries = countries;
        this.AllCountries = countries;
        this.collectionSize = this.countries.length;
        this.spinner.hide();
      },
      error => this.errorMessage = error as any
    );
  }

  get filteredCountry(): Country[] {
    return this.countries
      .map((country, i) => ({ ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  deleteCountry(id: any) {
    if (confirm('Are you sure to delete record?')) {
      this.countriesService.deleteCountry(id, this.countries);
      this.ngOnInit();
      this.toastr.success('Record successfully deleted.', '',
        {
          positionClass: 'toast-top-center',
          closeButton: true,
          timeOut: 5000
        }
      );

    }
  }

  resetFields() {
    this._regionFilter = '';
    this._listFilter = '';
    this.onChange(this._regionFilter);
  }
}
