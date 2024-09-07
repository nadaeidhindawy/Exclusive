import { HttpClient } from '@angular/common/http';
import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartNumber: WritableSignal<number> = signal(0)


  constructor(private _HttpClient: HttpClient) {

    effect(() => {
      localStorage.setItem('cartItem', this.cartNumber().toString())
    })
  };


  addProductToCart(id: string): Observable<any> {


    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`, {
      // body
      "productId": id
    },


    )
  }


  getProductToCart(): Observable<any> {


    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`,


    )
  }
  deleteSpecificCartItem(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,


    )
  }

  updateProductQuantity(id: string, newCount: number): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        "count": newCount
      },

    )
  }
  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`,

    )
  }
}
