import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const _Router = inject(Router)
  // const _PLATFORM_ID = inject(PLATFORM_ID)


  // platFormId id --------isPlateFormBrowser (id)    -- platFormServer(id)

  // Global Object Browser - window - document - localStorage - location - navigation  -----Guard -lifeCycle component(ssr)

  // check type Global Object !== undefined


  if (typeof localStorage !== 'undefined') {
    if (localStorage.getItem('userToken') !== null) {
      return true;


    } else {
      _Router.navigate(['/login'])
      // navigate to login -----router
      return false;
    }

  }
  else {
    return false;
  }










};
