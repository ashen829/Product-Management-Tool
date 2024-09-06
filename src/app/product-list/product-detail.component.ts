import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  pageTitle : string = 'Product Detail';
  errorMessage = '';
  product : IProduct | undefined;
  isEditMode: boolean = false;
  products: IProduct[] = [];

  constructor(private route : ActivatedRoute,
              private router : Router,
              private productService: ProductService){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getProduct(id);
    }
  }
  
  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });
  }

  onBack() : void {
    this.router.navigate(['/products']);
  }

  toggleEditMode(): void {
    if (this.isEditMode && this.product) {
      this.saveProduct(this.product);
    }
    this.isEditMode = !this.isEditMode;
  }

  saveProduct(product: IProduct): void {
    this.productService.updateProduct(product).subscribe({
      next: updatedProduct => {
        console.log('Product updated:', updatedProduct);
        const index = this.products.findIndex(p => p.productId === updatedProduct.productId);
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }
      },
      error: err => this.errorMessage = err
    });
  }
}
