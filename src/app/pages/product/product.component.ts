import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { FinancialProduct } from '../../interfaces/financial-product.interface';
import {
  Pagination,
  QuantityPerPage,
} from '../../interfaces/pagination.interface';
import { FinancialProductService } from './../../services/financial-product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  private readonly destroy$: Subject<void> = new Subject();

  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('quantityPerPage') quantityPerPage!: ElementRef;

  public isLoading: boolean = false;
  public pagination!: Pagination;
  public quantityPerPageOptions: QuantityPerPage[] = [
    { value: 5, selected: true },
    { value: 10, selected: false },
    { value: 20, selected: false },
  ];

  public productsAll: FinancialProduct[] = [];
  public products: FinancialProduct[] = [];
  public dataSetProducts: FinancialProduct[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private financialProductService: FinancialProductService,
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  public handleSearchProducts(event: any): void {
    const { value } = event.target;
    const filterProducts = this.productsAll.filter(
      (product) =>
        product.name.includes(value) || product.description.includes(value)
    );
    this.products = filterProducts;
    this.calculatePagination();
  }

  public handleSearchClear(): void {
    this.products = this.productsAll;
    this.renderer.setProperty(this.searchInput.nativeElement, 'value', '');
    this.calculatePagination();
  }

  public handleQuantityPerPage(value: any): void {
    this.quantityPerPageOptions = this.quantityPerPageOptions.map((option) => ({
      ...option,
      selected: option.value == value,
    }));
    this.calculatePagination();
  }

  public handlePaginationDecrement(): void {
    this.pagination.current = this.pagination.current - 1;
    this.calculateTableElements();
  }

  public handlePaginationIncrement(): void {
    this.pagination.current = this.pagination.current + 1;
    this.calculateTableElements();
  }

  public handleAddProduct(): void {
    this.router.navigate([`add-product`], {
      relativeTo: this.activatedRoute,
    });
  }

  private getProducts(): void {
    this.isLoading = true;
    this.financialProductService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => this.getProductsSuccess(response),
      });
  }

  private getProductsSuccess(response: FinancialProduct[]): void {
    this.isLoading = false;
    this.products = response;
    this.productsAll = response;
    this.calculatePagination();
  }

  private calculatePagination(): void {
    const quantityPerPageOptionsSelected = this.quantityPerPageOptions.find(
      (option) => option.selected
    );

    this.pagination = {
      current: 1,
      total: Math.ceil(
        this.products.length / quantityPerPageOptionsSelected!.value
      ),
    };
    this.calculateTableElements();
  }

  private calculateTableElements(): void {
    const quantityPerPageOptionsSelected = this.quantityPerPageOptions.find(
      (option) => option.selected
    );
    const indexStart =
      (this.pagination.current - 1) * quantityPerPageOptionsSelected!.value;
    const indexEnd =
      this.pagination.current * quantityPerPageOptionsSelected!.value;

    this.dataSetProducts = this.products.slice(indexStart, indexEnd);
  }
}
