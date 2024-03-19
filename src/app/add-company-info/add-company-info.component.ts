import { Component, OnInit } from '@angular/core';
import { Company } from '../model/company';
import { ValidationErrors } from '@angular/forms';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../service/products.service';
import { Town } from '../model/town';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-company-info',
  templateUrl: './add-company-info.component.html',
  styleUrl: './add-company-info.component.sass',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class AddCompanyInfoComponent implements OnInit {
  form: FormGroup;
  towns!: Town[];
  companyMessage: string | undefined;
  showNameError: boolean = false;
  showKeywordsError: boolean = false;
  showBidAmountError: boolean = false;
  showCampaignFundError: boolean = false;
  showRadiusError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      keywords: ['', Validators.required],
      bidAmount: [
        '',
        [Validators.required, Validators.min(10), this.validateNumber],
      ],
      campaignFund: ['', Validators.required, this.validateNumberAsync],
      status: ['', Validators.required],
      town: ['', Validators.required],
      radius: [
        '',
        [Validators.required, Validators.min(0), this.validateNumber],
      ],
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

  validateNumber(checkItem: any) {
    const value = checkItem.value;
    if (isNaN(value)) {
      return { invalidNumber: true };
    }
    return null;
  }

  validateNumberAsync(checkItem: any): Promise<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      const value = checkItem.value;
      if (isNaN(value)) {
        resolve({ invalidNumber: true });
      } else {
        resolve(null);
      }
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

      const id = +this.route.snapshot.params['id'];
      this.productsService.addNewCompany(newCompany, id).subscribe((data) => {
        const countdownSeconds = 3;
        if (data) {
          let remainingSeconds = countdownSeconds;
          const countdownInterval = setInterval(() => {
            remainingSeconds--;
            this.companyMessage = `Company has created. Redirecting in ${remainingSeconds} seconds...`;
            if (remainingSeconds <= 0) {
              clearInterval(countdownInterval);
              this.companyMessage = undefined;
              this.router.navigate(['product-details', id]);
              this.form.reset();
            }
          }, 1000);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
