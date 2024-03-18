import { Component, OnInit, booleanAttribute } from '@angular/core';
import { Company } from '../model/company';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-add-company-info',
  templateUrl: './add-company-info.component.html',
  styleUrl: './add-company-info.component.sass',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class AddCompanyInfoComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      keywords: ['', Validators.required],
      bidAmount: ['', Validators.required],
      campaignFund: ['', Validators.required],
      status: ['', Validators.required],
      town: ['', Validators.required],
      radius: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      const newCompany: Company = {
        id: new Date().getTime(),
        name: formData.name,
        keywords: formData.keywords,
        bidAmount: formData.bidAmount,
        campaignFund: formData.campaignFund,
        status: formData.status,
        town: formData.town,
        radius: formData.radius,
      };

      this.productsService.setNewCompany(newCompany);

      this.form.reset();
    } else {
      console.error('Form is invalid');
    }
  }
}
