import { Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { FinancialProductService } from './../../services/financial-product.service';
import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let activatedRoute: ActivatedRoute;
  let financialProductService: jasmine.SpyObj<FinancialProductService>;
  let renderer2: jasmine.SpyObj<Renderer2>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    activatedRoute = {
      snapshot: {
        params: {},
      },
    } as any;

    financialProductService = jasmine.createSpyObj('FinancialProductService', [
      'getAll',
    ]);

    renderer2 = jasmine.createSpyObj('Renderer2', ['setProperty']);

    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: FinancialProductService, useValue: financialProductService },
        { provide: Renderer2, useValue: renderer2 },
        { provide: Router, useValue: router },
      ],
    });

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle search products', () => {
    component.productsAll = [
      {
        id: 'testId',
        name: 'testName',
        description: 'testDescription',
        logo: 'testLogo',
        date_release: '2023-12-03',
        date_revision: '2024-12-03',
      },
    ];
    const event = { target: { value: 'Test' } };

    component.handleSearchProducts(event);

    expect(component.products.length).toBe(1);
  });

  it('should handle search clear', () => {
    component.products = [
      {
        id: 'testId',
        name: 'testName',
        description: 'testDescription',
        logo: 'testLogo',
        date_release: '2023-12-03',
        date_revision: '2024-12-03',
      },
    ];
    renderer2.setProperty.calls.reset();

    component.handleSearchClear();

    expect(component.products).toEqual(component.productsAll);
    expect(renderer2.setProperty).toHaveBeenCalledWith(
      component.searchInput.nativeElement,
      'value',
      ''
    );
    expect(component.pagination).toBeDefined();
  });

  it('should handle quantity per page', () => {
    const value = 10;

    component.handleQuantityPerPage(value);

    expect(component.quantityPerPageOptions).toEqual([
      { value: 5, selected: false },
      { value: 10, selected: true },
      { value: 20, selected: false },
    ]);
    expect(component.pagination).toBeDefined();
  });
});
