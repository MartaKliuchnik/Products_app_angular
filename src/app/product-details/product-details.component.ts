import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../service/products.service';
import { Product } from '../model/product';
import { Company } from '../model/company';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.sass',
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  newCompany: Company | undefined;
  private newCompanySubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  ) {
    this.newCompanySubscription = this.productsService.newCompany$.subscribe(
      (newCompany) => {
        this.newCompany = newCompany;
        if (this.product) {
          this.product.companies.push(newCompany);
        }
      }
    );
  }

  deleteCompany(productId: number, companyId: number) {
    this.productsService.deleteCompany(productId, companyId).subscribe(() => {
      this.product.companies = this.product.companies.filter(
        (company) => company.id !== companyId
      );
    });
  }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.productsService
      .getProduct(id)
      .subscribe((product: Product | undefined) => {
        if (!product) {
          this.router.navigate(['/not-found']);
        } else {
          this.product = product;
        }
      });
  }

  ngOnDestroy() {
    this.newCompanySubscription.unsubscribe();
  }
}
