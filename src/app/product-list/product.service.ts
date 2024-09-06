import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = 'http://localhost:3000/product';
  private products: IProduct[] = [];

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => console.log('All', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }


  getProduct(id: number): Observable<IProduct | undefined> {
    return this.getProducts()
      .pipe(
        map((products: IProduct[]) => products.find(p => p.productId === id))
      );
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<IProduct>(`${this.productUrl}/${product.id}`, product, httpOptions).pipe(
      tap(data => console.log('Updated Product:', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }


  createProduct(product: IProduct): Observable<IProduct> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<IProduct>(this.productUrl, product, httpOptions).pipe(
      tap(data => console.log('Created Product:', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

    deleteProduct(id: string): Observable<void> {
        return this.http.delete<void>(`${this.productUrl}/${id}`).pipe(
          tap(() => console.log(`Deleted Product with ID: ${id}`)),
          catchError(this.handleError)
        );
      }


  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
