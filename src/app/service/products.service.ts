import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { Product } from '../model/product';
import { products } from '../mock-data/data';
import { Company } from '../model/company';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private newCompanySubject = new Subject<Company>();
  newCompany$ = this.newCompanySubject.asObservable();
  products: Product[] = products;

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

  deleteCompany(productId: number, companyId: number): Observable<void> {
    const productIndex = this.products.findIndex(
      (product) => product.id === productId
    );
    if (productIndex !== -1) {
      const product = this.products[productIndex];
      product.companies = product.companies.filter(
        (company) => company.id !== companyId
      );
      return of(undefined);
    } else {
      return throwError('Product not found');
    }
    // const productIndex = this.products.findIndex(
    //   (product) => product.id === idProduct
    // );
    // if (productIndex !== -1) {
    //   const product = this.products[productIndex];
    //   product.companies = product.companies.filter(
    //     (company) => company.id !== idCompany
    //   );
    //   console.log(product.companies);
    //   return of(undefined);
    // } else {
    //   return throwError('Product not found');
    // }
  }
}
