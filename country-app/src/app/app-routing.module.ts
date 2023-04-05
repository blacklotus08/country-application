import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CountryListComponent } from './country/country-list/country-list.component';
import { CountryDetailsComponent } from './country/country-details/country-details.component';
import { AddCountryComponent } from './country/add-country/add-country.component';
import { EditCountryComponent } from './country/edit-country/edit-country.component';
import { CountryEditGuard } from './country/guards/country-edit.guard';

const routes: Routes = [
  { path: '', component : CountryListComponent },
  { path: 'country-detail/:name' , component : CountryDetailsComponent },
  { path: 'add-country' , component : AddCountryComponent },
  { path: 'edit-country/:id' ,
    canDeactivate : [CountryEditGuard],
    component : EditCountryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})

export class AppRoutingModule { }
