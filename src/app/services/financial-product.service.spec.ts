import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../environments/environment';
import { FinancialProduct } from '../interfaces/financial-product.interface';
import { FinancialProductService } from './financial-product.service';

describe('FinancialProductService', () => {
  let service: FinancialProductService;
  let httpMock: HttpTestingController;
  const mockProducts: FinancialProduct[] = [
    {
      id: 'trj-crd-17',
      name: 'Nombre del producto',
      description: 'descripcion del producto',
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      date_release: '2023-12-03T00:00:00.000+00:00',
      date_revision: '2024-12-03T00:00:00.000+00:00',
    },
    {
      id: 'trj-crd-2',
      name: 'Nombre del producto 2',
      description: 'descripcion del producto 2',
      logo: 'https://www.surlat.cl/wp-content/uploads/2021/11/default-featured-image-1.png',
      date_release: '2023-12-02T00:00:00.000+00:00',
      date_revision: '2024-12-02T00:00:00.000+00:00',
    },
    {
      id: 'trj-crd-3',
      name: 'Nombre del producto 3',
      description: 'descripcion del producto 3',
      logo: 'https://www.surlat.cl/wp-content/uploads/2021/11/default-featured-image-1.png',
      date_release: '2023-12-03T00:00:00.000+00:00',
      date_revision: '2024-12-03T00:00:00.000+00:00',
    },
    {
      id: 'trj-crd-4',
      name: 'Nombre del producto 4',
      description: 'descripcion del producto 4',
      logo: 'https://www.surlat.cl/wp-content/uploads/2021/11/default-featured-image-1.png',
      date_release: '2023-12-04T00:00:00.000+00:00',
      date_revision: '2024-12-04T00:00:00.000+00:00',
    },
    {
      id: 'trj-crd-5',
      name: 'Nombre del producto 5',
      description: 'descripcion del producto 5',
      logo: 'https://www.surlat.cl/wp-content/uploads/2021/11/default-featured-image-1.png',
      date_release: '2023-12-05T00:00:00.000+00:00',
      date_revision: '2024-12-05T00:00:00.000+00:00',
    },
    {
      id: 'trj-crd-6',
      name: 'producto numero seis',
      description: 'descripcion del producto 6',
      logo: 'https://www.surlat.cl/wp-content/uploads/2021/11/default-featured-image-1.png',
      date_release: '2023-12-05T00:00:00.000+00:00',
      date_revision: '2024-12-05T00:00:00.000+00:00',
    },
    {
      id: 'trj-crd-7',
      name: 'producto numero 7',
      description: 'descripcion del producto siete',
      logo: 'https://www.surlat.cl/wp-content/uploads/2021/11/default-featured-image-1.png',
      date_release: '2023-12-05T00:00:00.000+00:00',
      date_revision: '2024-12-05T00:00:00.000+00:00',
    },
    {
      id: 'trj-crd-8',
      name: 'producto numero 8',
      description: 'descripcion del producto ocho',
      logo: 'https://www.surlat.cl/wp-content/uploads/2021/11/default-featured-image-1.png',
      date_release: '2023-12-05T00:00:00.000+00:00',
      date_revision: '2024-12-05T00:00:00.000+00:00',
    },
    {
      id: 'trj-crd-10',
      name: 'producto numero 10',
      description: 'descripcion del producto diez',
      logo: 'https://www.surlat.cl/wp-content/uploads/2021/11/default-featured-image-1.png',
      date_release: '2023-12-05T00:00:00.000+00:00',
      date_revision: '2024-12-05T00:00:00.000+00:00',
    },
    {
      id: 'trj-crd-9',
      name: 'producto numero 10',
      description: 'descripcion del producto diez',
      logo: 'https://www.surlat.cl/wp-content/uploads/2021/11/default-featured-image-1.png',
      date_release: '2023-12-05T00:00:00.000+00:00',
      date_revision: '2024-12-05T00:00:00.000+00:00',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FinancialProductService],
    });

    service = TestBed.inject(FinancialProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all financial products', () => {
    service.getAll().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(
      environment.endpoints.getAllFinancialProducts
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should get verification for id', () => {
    const id = 'id-trj-test';

    service.getVerificationIdProduct(id).subscribe((result) => {
      expect(result).toBeTruthy();
    });

    const req = httpMock.expectOne(
      `${environment.endpoints.getVerificationIdProduct.replace(
        '{{id}}',
        encodeURIComponent(id)
      )}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(true);
  });

  it('should create financial product', () => {
    const mockProduct: FinancialProduct = {
      id: 'trj-crd-20',
      name: 'Nombre del producto 20',
      description: 'descripcion del producto 20',
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      date_release: '2023-12-03T00:00:00.000+00:00',
      date_revision: '2024-12-03T00:00:00.000+00:00',
    };

    service.postCreateProduct(mockProduct).subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(
      environment.endpoints.postCreateFinancialProduct
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockProduct);
  });
});
