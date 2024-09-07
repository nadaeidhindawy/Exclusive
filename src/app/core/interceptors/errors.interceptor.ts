import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

  const _ToastrService = inject(ToastrService)
  //  req logic
  return next(req).pipe(catchError((err) => {

    console.log('interceptors', err.error.message)

    // alert --Toastr Alert Global


    _ToastrService.error(err.error.message, 'Exclusive')

    return throwError(() => Error)
  }))




};
