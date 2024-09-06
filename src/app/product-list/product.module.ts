import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ConverToSpacesPipe } from './shared/conver-to-spaces.pipe';
import { StarComponent } from './shared/star.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';
import { SharedModule } from './shared.module';
import { ProductEditComponent } from './product-edit.component';
import { ProductAddComponent } from './product-add.component';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductEditComponent,
    ProductDetailComponent,
    ConverToSpacesPipe,
    StarComponent,
    ProductAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path : 'products', component : ProductListComponent},
      {path : 'product/add', component : ProductAddComponent},
      {
        path : 'product/:id', 
        canActivate : [ProductDetailGuard],
        component : ProductDetailComponent
      },
      {
        path : 'product/edit/:id', 
        canActivate : [ProductDetailGuard],
        component : ProductEditComponent
      },
    ]),
    SharedModule
  ]
})
export class ProductModule { }
