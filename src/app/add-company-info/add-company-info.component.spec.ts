import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyInfoComponent } from './add-company-info.component';

describe('AddCompanyInfoComponent', () => {
  let component: AddCompanyInfoComponent;
  let fixture: ComponentFixture<AddCompanyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCompanyInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCompanyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
