import { AbstractControl } from '@angular/forms';

/* Service */
import { CountryService } from '../services/country.service';

/*Model*/
import { Country } from '../models/country.model';
import { debounceTime, map } from 'rxjs/operators';


export class ValidateIdNotTaken {
  static countries: Country[];


  static createValidator(countryService: CountryService) {
    return (control: AbstractControl) => {
      return countryService.CheckCode(control.value).pipe(
        debounceTime(1000),
        map((res:any) => {
          this.countries = res;
          this.countries = this.countries.filter((country: Country) =>
          (country.country_code === control.value || country.country_code.toLocaleLowerCase === control.value.toLowerCase()));

          if (this.countries.length == 0) {
              return null;
          } else {
            return {record_exist: true};
          }
      }));
    };
  }
}
