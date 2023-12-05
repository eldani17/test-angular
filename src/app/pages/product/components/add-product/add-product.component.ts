import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { FinancialProduct } from '../../../../interfaces/financial-product.interface';
import { FinancialProductService } from '../../../../services/financial-product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  private readonly destroy$: Subject<void> = new Subject();

  public formProduct: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private financialProductService: FinancialProductService
  ) {
    const controls = {
      id: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
          ],
          updateOn: 'change',
        },
      ],
      name: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(100),
          ],
          updateOn: 'change',
        },
      ],
      description: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(200),
          ],
          updateOn: 'change',
        },
      ],
      logo: ['', { validators: [Validators.required], updateOn: 'change' }],
      date_release: [
        '',
        { validators: [Validators.required], updateOn: 'change' },
      ],
      date_revision: [
        '',
        { validators: [Validators.required], updateOn: 'change' },
      ],
    };

    this.formProduct = this.formBuilder.group(controls);
  }

  public handleResetForm(): void {
    this.formProduct.reset();
  }

  public handleCreateProduct(): void {
    const { value } = this.formProduct;
    const product: FinancialProduct = { ...value };

    this.financialProductService
      .getVerificationIdProduct(value.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        if (response) {
          this.formProduct.controls['id'].setErrors({ duplicated: true });
        } else {
          this.financialProductService
            .postCreateProduct(product)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: () => {
                this.formProduct.reset();
              },
            });
        }
      });
  }
}
