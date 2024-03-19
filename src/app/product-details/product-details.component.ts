import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../service/products.service';
import { Product } from '../model/product';
import { Company } from '../model/company';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.sass',
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  newCompany: Company | undefined;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  ) {}

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

  deleteCompany(productId: number, companyId: number) {
    this.productsService
      .deleteCompany(productId, companyId)
      .subscribe((product: Product) => {
        this.product = product;
      });
  }

  goToAddCompanyPage(productId: number) {
    this.router.navigate(['add-new-company', productId]);
  }

  goToUpdateCompany(productId: number, companyId: number | undefined) {
    this.router.navigate(['update-company', productId, companyId]);
  }
}
