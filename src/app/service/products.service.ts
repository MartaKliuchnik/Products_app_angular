import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../model/product';
import { products } from '../mock-data/data';
import { Company } from '../model/company';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: Product[] = products;
  private readonly productsKey = 'products';

  constructor() {
    let localStorageData = this.getProductsFromLocalStorage();
    if (!localStorageData) {
      this.getProductsFromLocalStorage();
      this.setDataToLocalStorage();
    } else {
      this.products = localStorageData;
    }
  }

  setDataToLocalStorage(): void {
    localStorage.setItem(this.productsKey, JSON.stringify(this.products));
  }

  getProductsFromLocalStorage(): Product[] {
    return JSON.parse(localStorage.getItem(this.productsKey));
  }

  getProducts(): Observable<Product[]> {
    this.getProductsFromLocalStorage();
    return of(this.products);
  }

  getProduct(id: number): Observable<Product | undefined> {
    const product = this.products.find((product) => product.id === id);
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

  addNewCompany(newCompany: Company, productId: number) {
    const productIndex = this.products.findIndex(
      (product) => product.id === productId
    );
    if (productIndex !== -1) {
      const product = this.products[productIndex];
      product.companies.push(newCompany);
      this.setDataToLocalStorage();
      return of(true);
    } else {
      return throwError(() => {
        return 'Product not found';
      });
    }
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
        this.setDataToLocalStorage();
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

  deleteCompany(productId: number, companyId: number): Observable<Product> {
    const productIndex = this.products.findIndex(
      (product) => product.id === productId
    );
    if (productIndex !== -1) {
      const product = this.products[productIndex];
      if (product) {
        product.companies = product.companies.filter(
          (company) => company.id !== companyId
        );

        this.setDataToLocalStorage();
        return of(product);
      } else {
        return throwError(() => {
          return 'Product not found';
        });
      }
    } else {
      return throwError(() => {
        return 'Product not found';
      });
    }
  }

  getDataToStarage(key: string) {
    return localStorage.getItem(key);
  }

  setDataToStarage(key: string, value: string) {
    return localStorage.setItem(key, value);
  }
}
