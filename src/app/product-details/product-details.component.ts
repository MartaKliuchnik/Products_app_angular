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
        console.log(this.newCompany);
        if (this.product) {
          this.product.companies.push(newCompany);
        }
      }
    );
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
