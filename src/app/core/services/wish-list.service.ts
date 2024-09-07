import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private _HttpClient: HttpClient) { };


  AddProductToWishlist(id: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
      {
        // body
        "productId": id
      }
    )

  }
  getProductWishlist(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`,

    )

  }
  removeWishlist(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`)
  }

}
