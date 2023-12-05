import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';

@NgModule({
  declarations: [ProductComponent, AddProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NgxSkeletonLoaderModule.forRoot(),
    ReactiveFormsModule,
  ],
})
export class ProductModule {}
