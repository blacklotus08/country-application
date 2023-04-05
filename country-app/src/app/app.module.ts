import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CountryListComponent } from './country/country-list/country-list.component';
import { CountryDetailsComponent } from './country/country-details/country-details.component';
import { AddCountryComponent } from './country/add-country/add-country.component';
import { EditCountryComponent } from './country/edit-country/edit-country.component';

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    CountryDetailsComponent,
    AddCountryComponent,
    EditCountryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
