import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { FinancialProduct } from '../interfaces/financial-product.interface';

@Injectable({
  providedIn: 'root',
})
export class FinancialProductService {
  constructor(private readonly http: HttpClient) {}

  public getAll(): Observable<FinancialProduct[]> {
    return this.http.get<FinancialProduct[]>(
      environment.endpoints.getAllFinancialProducts
    );
  }

  public getVerificationIdProduct(id: string): Observable<boolean> {
    const interpolatedEndpoint = environment.endpoints.getVerificationIdProduct;

    return this.http.get<boolean>(
      interpolatedEndpoint.replace(`{{id}}`, encodeURIComponent(id))
    );
  }

  public postCreateProduct(
    product: FinancialProduct
  ): Observable<FinancialProduct> {
    return this.http.post<FinancialProduct>(
      environment.endpoints.postCreateFinancialProduct,
      product
    );
  }
}
