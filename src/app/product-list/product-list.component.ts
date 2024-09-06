import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit,OnDestroy {

  pageTitle : string ="Product List!";
  action : string = "view";
  imageWidth : number = 50;
  imageMargin : number = 2;
  showImage :boolean = false;
  errorMessage = ' ';
  sub! : Subscription;

  private _listFilter : string = '';
  get listFilter():string{
    return this._listFilter;
  }
  set listFilter(value:string){
    this._listFilter=value;
    console.log('In Setter :',value);
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts : IProduct[] = [];
  products : IProduct[]=[];

  constructor(private route : ActivatedRoute,
    private router : Router,
    private productService: ProductService){}

  performFilter(filterBy : string) : IProduct[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product : IProduct) =>
      product.productName.toLocaleLowerCase().includes(filterBy));
  }

  toggleImage() : void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next : products =>{
        this.products = products;
        this.filteredProducts = this.products;
        console.log(this.products.length); 
      },
      error : err => this.errorMessage = err
    }); 
    console.log(this.action);
     
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onRatingClicked(message : string):void{
    this.pageTitle='Product List: '+ message;
  }

  removeProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        console.log('Product deleted:', id);
        this.products = this.products.filter(p => p.id !== id);
        this.router.navigate(['/products']);
      },
      error: err => this.errorMessage = err
    });
  }
}
