import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { FinancialProduct } from '../../../../interfaces/financial-product.interface';
import { FinancialProductService } from '../../../../services/financial-product.service';
import { AddProductComponent } from './add-product.component';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let formBuilder: FormBuilder;
  let financialProductService: jasmine.SpyObj<FinancialProductService>;

  beforeEach(() => {
    financialProductService = jasmine.createSpyObj('FinancialProductService', [
      'getVerificationIdProduct',
      'postCreateProduct',
    ]);

    TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      providers: [
        FormBuilder,
        { provide: FinancialProductService, useValue: financialProductService },
      ],
    });

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    component.formProduct = formBuilder.group({
      id: 'testId',
      name: 'testName',
      description: 'testDescription',
      logo: 'testLogo',
      date_release: '2023-12-03',
      date_revision: '2024-12-03',
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset form on handleResetForm', () => {
    component.handleResetForm();
    expect(component.formProduct.value).toEqual({
      id: null,
      name: null,
      description: null,
      logo: null,
      date_release: null,
      date_revision: null,
    });
  });

  it('should handle product creation on handleCreateProduct', () => {
    const mockProduct: FinancialProduct = {
      id: 'trj-crd-20',
      name: 'Nombre del producto 20',
      description: 'descripcion del producto 20',
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      date_release: '2023-12-03',
      date_revision: '2024-12-03',
    };

    financialProductService.getVerificationIdProduct.and.returnValue(of(false));
    financialProductService.postCreateProduct.and.returnValue(of(mockProduct));

    component.handleCreateProduct();

    expect(
      financialProductService.getVerificationIdProduct
    ).toHaveBeenCalledWith('testId');
    expect(financialProductService.postCreateProduct).toHaveBeenCalledWith({
      id: 'testId',
      name: 'testName',
      description: 'testDescription',
      logo: 'testLogo',
      date_release: '2023-12-03',
      date_revision: '2024-12-03',
    });
  });

  it('should set duplicated error on handleCreateProduct when ID is duplicated', () => {
    financialProductService.getVerificationIdProduct.and.returnValue(of(true));

    component.handleCreateProduct();

    expect(component.formProduct.controls['id'].hasError('duplicated')).toBe(
      true
    );
    expect(financialProductService.postCreateProduct).not.toHaveBeenCalled();
  });

  it('should not create product on handleCreateProduct when ID is duplicated', () => {
    financialProductService.getVerificationIdProduct.and.returnValue(of(true));

    component.handleCreateProduct();

    expect(financialProductService.postCreateProduct).not.toHaveBeenCalled();
  });
});
