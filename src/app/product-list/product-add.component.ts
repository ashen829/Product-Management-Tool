import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  pageTitle: string = "Add Product";
  products: IProduct[] = [];
  errorMessage = ' ';
  sub! : Subscription;

  newProduct: IProduct = {
    id : '',
    productId: 0,
    productName: '',
    productCode: '',
    description: '',
    releaseDate: '',
    price: 0,
    starRatings: 0,
    imageUrl: '',
  };

  constructor(private productService: ProductService, private router: Router) {}

  addProduct(newProduct: IProduct): void {
    newProduct.id = this.generateRandomText();
    newProduct.productId = this.getNextId();
    this.productService.createProduct(newProduct).subscribe({
      next: product => {
        console.log('Product added:', product);
        this.products.push(product);
        this.router.navigate(['/products']);
      },
      error: err => this.errorMessage = err
    });
  }

  getNextId(): number {
    const maxId = this.products.length > 0 ? Math.max(...this.products.map(p => p.productId)) : 0;
    return maxId + 1;
  }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
      },
      error: err => this.errorMessage = err
    });
  }

  generateRandomText(length: number = 4): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
    
    return result;
  }
  
}
