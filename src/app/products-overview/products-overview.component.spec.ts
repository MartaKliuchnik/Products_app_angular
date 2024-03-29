import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsOverviewComponent } from './products-overview.component';
import { ProductsService } from '../service/products.service';
import { of } from 'rxjs';
import { products } from '../mock-data/data';
import { Router } from '@angular/router';

describe('ProductsOverviewComponent', () => {
  let componentUnderTest: ProductsOverviewComponent;
  let fixture: ComponentFixture<ProductsOverviewComponent>;
  let productsService: ProductsService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsOverviewComponent],
      providers: [ProductsService],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsOverviewComponent);
    componentUnderTest = fixture.componentInstance;
    productsService = fixture.debugElement.injector.get(ProductsService);
    router = fixture.debugElement.injector.get(Router);
  });
  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });
  it('should test', () => {
    expect(componentUnderTest.products.length).toEqual(0);

    const productsServiceSpy = spyOn(
      productsService,
      'getProducts'
    ).and.returnValue(of([products[0]]));

    fixture.detectChanges();

    expect(componentUnderTest.products.length).toEqual(1);
    expect(componentUnderTest.products).toEqual([products[0]]);
  });
  it('should navigate', () => {
    const productId = 1;
    let navigateSpy = spyOn(router, 'navigate');

    componentUnderTest.goToProductDetails(productId);

    expect(navigateSpy).toHaveBeenCalledWith(['product-details', productId]);
  });
});
