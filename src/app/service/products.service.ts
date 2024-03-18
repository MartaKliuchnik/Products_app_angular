import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { Product } from '../model/product';
import { products } from '../mock-data/data';
import { Company } from '../model/company';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private newCompanySubject = new Subject<Company>();
  newCompany$ = this.newCompanySubject.asObservable();

  constructor() {}

  getProducts(): Observable<Product[]> {
    return of(products);
  }

  getProduct(id: number): Observable<Product | undefined> {
    const product = products.find((product) => product.id === id);
    return of(product);
  }

  setNewCompany(newCompany: Company) {
    this.newCompanySubject.next(newCompany);
  }
}
