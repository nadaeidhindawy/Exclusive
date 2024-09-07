import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  if (localStorage.getItem('userToken') !== null) {

    // token
    if (req.url.includes('cart') || req.url.includes('wishlist') || req.url.includes('orders')) {

      req = req.clone({
        setHeaders: { token: localStorage.getItem('userToken')! }
      })
    }
  }

  return next(req)

};
