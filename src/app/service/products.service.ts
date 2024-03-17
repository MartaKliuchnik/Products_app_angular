import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Product } from '../model/product';
import { products } from '../mock-data/data';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}

  getProducts(): Observable<Product[]> {
    return of(products);
  }

  getProduct(id: number): Observable<Product | undefined> {
    const product = products.find((product) => product.id === id);
    return of(product);
  }
}
