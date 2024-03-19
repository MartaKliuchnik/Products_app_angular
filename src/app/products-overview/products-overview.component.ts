import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { Product } from '../model/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './products-overview.component.html',
  styleUrl: './products-overview.component.sass',
})
export class ProductsOverviewComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((products: Product[]) => {
      console.log(products);
      this.products = products;
    });
  }
  goToProductDetails(productId: number) {
    this.router.navigate(['product-details', productId]);
  }
}
