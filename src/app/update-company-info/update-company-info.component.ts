import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../service/products.service';
import { Company } from '../model/company';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
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

  onSubmit(updatedCompany: Company) {
    const idProduct = +this.route.snapshot.params['idProd'];
    const idCompany = +this.route.snapshot.params['idCom'];
    this.productsService
      .updateCompany(updatedCompany, idProduct, idCompany)
      .subscribe((data) => {
        if (data) {
          this.companyMessage = 'Company has updated';
        }
      });
    setTimeout(() => {
      this.companyMessage = undefined;
      this.router.navigate(['product-details', idProduct]);
    }, 2000);
  }
}
