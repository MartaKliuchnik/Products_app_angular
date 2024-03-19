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

  getCompany(
    productId: number,
    companyId: number
  ): Observable<Company | undefined> {
    const productIndex = this.products.findIndex(
      (product) => product.id === +productId
    );

    if (productIndex !== -1) {
      const product = this.products[productIndex];
      const company = product.companies.find(
        (company) => company.id === +companyId
      );
      return of(company);
    } else {
      return throwError(() => {
        return 'Product not found';
      });
    }
  }

  setNewCompany(newCompany: Company) {
    this.newCompanySubject.next(newCompany);
  }

  updateCompany(updatedCompany: Company, productId: number, companyId: number) {
    const productIndex = this.products.findIndex(
      (product) => product.id === productId
    );

    if (productIndex !== -1) {
      const product = this.products[productIndex];
      const companyIndex = product.companies.findIndex(
        (company) => company.id === companyId
      );

      if (companyIndex !== -1) {
        const updatedCompanyWithId = { ...updatedCompany, id: companyId };
        product.companies[companyIndex] = updatedCompanyWithId;
        return of(product.companies[companyIndex]);
      } else {
        return throwError(() => {
          return 'Company not found in product';
        });
      }
    } else {
      return throwError(() => {
        return 'Product not found';
      });
    }
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
      return throwError(() => {
        return 'Product not found';
      });
    }
  }
}
