import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { EditCountryComponent } from '../edit-country/edit-country.component';

@Injectable({
    providedIn: 'root'
})


export class CountryEditGuard implements CanDeactivate<EditCountryComponent> {
    canDeactivate(component: EditCountryComponent): boolean {
        if (component.countryForm.dirty) {
            const countryName = component.countryForm?.get('countryName')?.value;
            return confirm(`Navigate away and lose all changes to ${countryName} record?`);
        }
        return true;

    }
}