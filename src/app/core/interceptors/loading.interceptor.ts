import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const _NgxSpinnerService = inject(NgxSpinnerService)
  // req show ---loading

  _NgxSpinnerService.show()

  return next(req).pipe(finalize(() => {
    _NgxSpinnerService.hide()
  }))
};
