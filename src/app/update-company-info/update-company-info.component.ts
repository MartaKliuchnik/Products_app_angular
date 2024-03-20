import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../service/products.service';
import { Company } from '../model/company';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Town } from '../model/town';

@Component({
  selector: 'app-update-company-info',
  templateUrl: './update-company-info.component.html',
  styleUrl: './update-company-info.component.sass',
})
export class UpdateCompanyInfoComponent implements OnInit {
  company!: Company;
  form: FormGroup;
  towns!: Town[];
  companyMessage: string | undefined;
  showNameError: boolean = false;
  showKeywordsError: boolean = false;
  showBidAmountError: boolean = false;
  showCampaignFundError: boolean = false;
  showRadiusError: boolean = false;
  @ViewChild('submitButton') submitButton!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService
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
    const idProd = +this.route.snapshot.params['idProd'];
    const idCom = +this.route.snapshot.params['idCom'];

    this.productsService
      .getCompany(idProd, idCom)
      .subscribe((company: Company | undefined) => {
        if (!company) {
          this.router.navigate(['/not-found']);
        } else {
          this.company = company;
          this.form.patchValue({
            name: this.company?.name,
            keywords: this.company?.keywords,
            bidAmount: this.company?.bidAmount,
            campaignFund: this.company?.campaignFund,
            status: this.company?.status,
            town: this.company?.town,
            radius: this.company?.radius,
          });
        }
      });

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

  onSubmit(updatedCompany: Company) {
    this.submitButton.nativeElement.disabled = true;
    const idProduct = +this.route.snapshot.params['idProd'];
    const idCompany = +this.route.snapshot.params['idCom'];
    const countdownSeconds = 3;

    this.productsService
      .updateCompany(updatedCompany, idProduct, idCompany)
      .subscribe((data) => {
        if (data) {
          let remainingSeconds = countdownSeconds;
          const countdownInterval = setInterval(() => {
            remainingSeconds--;
            this.companyMessage = `Company has updated. Redirecting in ${remainingSeconds} seconds...`;
            if (remainingSeconds <= 0) {
              clearInterval(countdownInterval);
              this.companyMessage = undefined;
              this.router.navigate(['product-details', idProduct]);
            }
          }, 1000);
        }
      });
  }
}
