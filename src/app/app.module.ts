import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsOverviewComponent } from './products-overview/products-overview.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddCompanyInfoComponent } from './add-company-info/add-company-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { UpdateCompanyInfoComponent } from './update-company-info/update-company-info.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule, provideAngularSvgIcon } from 'angular-svg-icon';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailsComponent,
    ProductsOverviewComponent,
    NotFoundComponent,
    HeaderComponent,
    UpdateCompanyInfoComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AddCompanyInfoComponent,
    CommonModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    TypeaheadModule.forRoot(),
  ],
  providers: [provideClientHydration(), provideAngularSvgIcon()],
  bootstrap: [AppComponent],
})
export class AppModule {}
