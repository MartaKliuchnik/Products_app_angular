import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-overview',
  templateUrl: './products-overview.component.html',
  styleUrl: './products-overview.component.sass',
})
export class ProductsOverviewComponent implements OnInit {
  products: Product[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }
}