import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Company } from '../model/company';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../service/products.service';
import { Town } from '../model/town';

@Component({
  selector: 'app-add-company-info',
  templateUrl: './add-company-info.component.html',
  styleUrl: './add-company-info.component.sass',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class AddCompanyInfoComponent implements OnInit {
  @ViewChild('keywords') keywordInput!: ElementRef;
  form: FormGroup;
  towns!: Town[];
  predefinedKeywords: string[] = [
    'apple',
    'apricos',
    'banana',
    'orange',
    'pear',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      keywords: ['', Validators.required],
      bidAmount: ['', [Validators.required, Validators.min(10)]],
      campaignFund: ['', Validators.required],
      status: ['', Validators.required],
      town: ['', Validators.required],
      radius: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.towns = [
      Town.KRAKOW,
      Town.WARSAW,
      Town.GDANSK,
      Town.POZNAN,
      Town.WROCLAW,
    ];
  }

  checkKeywords(event: Event) {
    let currentValue = this.predefinedKeywords.filter((keyword: string) =>
      keyword.toLowerCase().startsWith((event.target as HTMLInputElement).value)
    );

    if (currentValue) {
      // this.form.get('keywords')?.setValue(currentValue);
      this.keywordInput.nativeElement.placeholder = currentValue;
    }
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
